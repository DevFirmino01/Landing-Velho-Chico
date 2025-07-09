from flask import Blueprint, request, jsonify, send_file
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
import io
import os
import re
from datetime import datetime

pdf_bp = Blueprint('pdf', __name__)

@pdf_bp.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    try:
        data = request.get_json()
        roteiro_html = data.get('roteiroHtml', '')
        nome = data.get('nome', 'Cliente')
        whatsapp = data.get('whatsapp', '')
        
        # Criar buffer para o PDF
        buffer = io.BytesIO()
        
        # Configurar documento PDF
        doc = SimpleDocTemplate(buffer, pagesize=A4, 
                              rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=18)
        
        # Estilos
        styles = getSampleStyleSheet()
        
        # Estilo personalizado para título
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            spaceAfter=30,
            textColor=HexColor('#4a7c59'),
            alignment=1  # Center alignment
        )
        
        # Estilo personalizado para subtítulos
        subtitle_style = ParagraphStyle(
            'CustomSubtitle',
            parent=styles['Heading2'],
            fontSize=16,
            spaceAfter=12,
            textColor=HexColor('#4a7c59'),
            spaceBefore=20
        )
        
        # Estilo personalizado para texto normal
        normal_style = ParagraphStyle(
            'CustomNormal',
            parent=styles['Normal'],
            fontSize=12,
            spaceAfter=6,
            leading=16
        )
        
        # Estilo para botão de contato
        contact_style = ParagraphStyle(
            'ContactButton',
            parent=styles['Normal'],
            fontSize=14,
            spaceAfter=12,
            spaceBefore=20,
            textColor=HexColor('#ffffff'),
            backColor=HexColor('#4a7c59'),
            borderColor=HexColor('#4a7c59'),
            borderWidth=1,
            borderPadding=10,
            alignment=1  # Center alignment
        )
        
        # Conteúdo do PDF
        story = []
        
        # Logo (se existir)
        logo_path = '/home/ubuntu/velho-chico-landing/src/assets/LogoAcessoria1FundoTransparente.png'
        if os.path.exists(logo_path):
            try:
                logo = Image(logo_path, width=2*inch, height=2*inch)
                logo.hAlign = 'CENTER'
                story.append(logo)
                story.append(Spacer(1, 20))
            except:
                pass
        
        # Título principal
        story.append(Paragraph("VELHO CHICO PASSEIOS", title_style))
        story.append(Paragraph("Roteiro Personalizado", subtitle_style))
        story.append(Spacer(1, 20))
        
        # Informações do cliente
        story.append(Paragraph(f"<b>Cliente:</b> {nome}", normal_style))
        if whatsapp:
            story.append(Paragraph(f"<b>WhatsApp:</b> {whatsapp}", normal_style))
        story.append(Paragraph(f"<b>Data de geração:</b> {datetime.now().strftime('%d/%m/%Y às %H:%M')}", normal_style))
        story.append(Spacer(1, 20))
        
        # Processar HTML do roteiro
        # Remover tags HTML e converter para texto formatado
        clean_text = re.sub(r'<[^>]+>', '', roteiro_html)
        clean_text = clean_text.replace('&nbsp;', ' ')
        
        # Dividir em linhas e processar
        lines = clean_text.split('\n')
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            if line.startswith('**') and line.endswith('**'):
                # Título em negrito
                title_text = line.replace('**', '')
                story.append(Paragraph(f"<b>{title_text}</b>", subtitle_style))
            elif line.startswith('•'):
                # Item de lista
                story.append(Paragraph(line, normal_style))
            else:
                # Texto normal
                story.append(Paragraph(line, normal_style))
        
        story.append(Spacer(1, 30))
        
        # Seção de contato
        story.append(Paragraph("ENTRE EM CONTATO CONOSCO", subtitle_style))
        story.append(Paragraph("Para mais informações e reservas:", normal_style))
        story.append(Paragraph("📱 WhatsApp: (82) 99617-3836", normal_style))
        story.append(Paragraph("📧 Email: contato@velhochicopasseios.com", normal_style))
        story.append(Paragraph("📍 Piranhas, Alagoas", normal_style))
        
        story.append(Spacer(1, 20))
        
        # Botão de contato estilizado
        whatsapp_link = f"https://wa.me/5582996173836?text=Olá! Vi o roteiro em PDF e gostaria de mais informações. Meu nome é {nome}."
        story.append(Paragraph(
            f'<a href="{whatsapp_link}" color="#ffffff">🚀 CLIQUE AQUI PARA FALAR CONOSCO NO WHATSAPP</a>',
            contact_style
        ))
        
        story.append(Spacer(1, 20))
        story.append(Paragraph("Obrigado por escolher a Velho Chico Passeios!", normal_style))
        story.append(Paragraph("Esperamos proporcionar uma experiência inesquecível em Piranhas!", normal_style))
        
        # Gerar PDF
        doc.build(story)
        buffer.seek(0)
        
        return send_file(
            buffer,
            as_attachment=True,
            download_name=f"roteiro_{nome.replace(' ', '_')}.pdf",
            mimetype='application/pdf'
        )
        
    except Exception as e:
        print(f"Erro ao gerar PDF: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

