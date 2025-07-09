import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Checkbox } from './components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Badge } from './components/ui/badge'
import { MapPin, Clock, DollarSign, Star, Phone, Mail, Instagram, Facebook, Camera, Mountain, Users, Heart, Utensils, History, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import './App.css'

// Import images
import logo from './assets/LogoAcessoria1FundoTransparente.png'
import centroHistorico from './assets/centro-historico.webp'
import rotaCangaco from './assets/rota-cangaco.webp'
import rioSaoFrancisco from './assets/rio-sao-francisco.jpg'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    dias: '',
    orcamento: '',
    experiencias: []
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [roteiro, setRoteiro] = useState('')
  const [isVisible, setIsVisible] = useState({})
  const [currentReview, setCurrentReview] = useState(0)

  // Avaliações reais do Google Maps
  const googleReviews = [
    {
      text: "Experiência excelente. A empresa foi atenciosa e cuidadosa com todas as explicações. Organizaram o roteiro com todos os passeios no universo piranhas, explicaram e sugeriram programas para a noite (tudo personalizado), os preços eram acessíveis e com descontos especiais.",
      author: "Luís Dias",
      rating: 5,
      date: "há 1 mês"
    },
    {
      text: "Passeio excelente. Atendimento muito bom, sem falar da localização. Quero voltar a Piranhas muitas vezes e fazer todos os passeios novamente. Curtir o centro histórico à noite também é muito bom.",
      author: "Allyson Soares Rodrigues", 
      rating: 5,
      date: "há 3 meses"
    },
    {
      text: "Excelente comunicação, prestatividade e educação. Fui muito bem atendido e recomendo para qualquer pessoa. Os passeios foram ótimos.",
      author: "Luís Felipe",
      rating: 5,
      date: "há 3 meses"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[id]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [googleReviews.length])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % googleReviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleExperienceChange = (experience, checked) => {
    setFormData(prev => ({
      ...prev,
      experiencias: checked 
        ? [...prev.experiencias, experience]
        : prev.experiencias.filter(exp => exp !== experience)
    }))
  }

  const generateRoteiro = () => {
    const { dias, orcamento, experiencias } = formData
    let roteiroHtml = ''

    if (dias === '1') {
      if (orcamento === 'ate-200') {
        roteiroHtml = `
          <h3 class="text-xl font-semibold text-primary mb-2">🌅 Roteiro de 1 Dia - Econômico (até R$ 200)</h3>
          <p class="mb-1"><strong>Manhã (8h-12h):</strong></p>
          <ul class="list-disc list-inside ml-4 mb-2">
            <li>City tour pelo Centro Histórico de Piranhas</li>
            <li>Visita à Igreja de Nossa Senhora da Saúde</li>
            <li>Caminhada pelas ruas de paralelepípedos</li>
            <li>Parada no Mirante Secular</li>
          </ul>
          <p class="mb-1"><strong>Tarde (14h-17h):</strong></p>
          <ul class="list-disc list-inside ml-4 mb-2">
            <li>Visita ao Museu do Sertão</li>
            <li>Conhecer a história do Cangaço</li>
            <li>Parada na Cachaçaria Altemar Dutra</li>
            <li>Tempo livre no centro histórico</li>
          </ul>
          <p class="mt-4"><strong>Inclui:</strong> Guia local, transporte básico</p>
          <p><strong>Valor:</strong> R$ 180 por pessoa</p>
        `
      } else if (orcamento === '200-500') {
        roteiroHtml = `
          <h3 class="text-xl font-semibold text-primary mb-2">🌅 Roteiro de 1 Dia - Intermediário (R$ 200-500)</h3>
          <p class="mb-1"><strong>Manhã (8h-12h):</strong></p>
          <ul class="list-disc list-inside ml-4 mb-2">
            <li>Centro Histórico completo com guia especializado</li>
            <li>Visita ao Museu do Sertão</li>
            <li>Mirante da Igreja do Rosário</li>
            <li>Torre do Relógio</li>
          </ul>
          <p class="mb-1"><strong>Tarde (14h-18h):</strong></p>
          <ul class="list-disc list-inside ml-4 mb-2">
            <li>Passeio de barco pelo Rio São Francisco</li>
            <li>Vista dos primeiros cânions</li>
            <li>Lanche típico a bordo</li>
            <li>Parada na Prainha de Piranhas</li>
          </ul>
          <p class="mt-4"><strong>Inclui:</strong> Guia especializado, transporte, passeio de barco, lanche</p>
          <p><strong>Valor:</strong> R$ 380 por pessoa</p>
        `
      }
    } else if (dias === '2' || dias === '3') {
      roteiroHtml = `
        <h3 class="text-xl font-semibold text-primary mb-2">🌅 Roteiro de ${dias} Dias - Completo (R$ 500-1000)</h3>
        <p class="mb-1"><strong>Dia 1:</strong></p>
        <ul class="list-disc list-inside ml-4 mb-2">
          <li>Manhã: Centro Histórico + Museu do Sertão</li>
          <li>Tarde: Rota do Cangaço (Grota do Angico)</li>
          <li>Noite: Jantar típico no centro histórico</li>
        </ul>
        <p class="mb-1"><strong>Dia 2:</strong></p>
        <ul class="list-disc list-inside ml-4 mb-2">
          <li>Manhã: Cânions do São Francisco (catamarã)</li>
          <li>Tarde: Usina Hidrelétrica de Xingó</li>
          <li>Noite: Apresentação cultural local</li>
        </ul>
        ${dias === '3' ? `
        <p class="mb-1"><strong>Dia 3:</strong></p>
        <ul class="list-disc list-inside ml-4 mb-2">
          <li>Manhã: Povoado de Entremontes</li>
          <li>Tarde: Atividades de aventura (trilhas/rapel)</li>
          <li>Noite: Despedida com música regional</li>
        </ul>
        ` : ''}
        <p class="mt-4"><strong>Inclui:</strong> Guia especializado, transporte, todas as entradas, refeições, hospedagem recomendada</p>
        <p><strong>Valor:</strong> R$ ${dias === '2' ? '750' : '980'} por pessoa</p>
      `
    } else {
      roteiroHtml = `
        <h3 class="text-xl font-semibold text-primary mb-2">🌅 Roteiro Premium de ${dias} Dias (Acima de R$ 1000)</h3>
        <p class="mb-1"><strong>Experiência Completa Incluindo:</strong></p>
        <ul class="list-disc list-inside ml-4 mb-2">
          <li>Todos os pontos turísticos principais</li>
          <li>Atividades de aventura personalizadas</li>
          <li>Experiências gastronômicas exclusivas</li>
          <li>Hospedagem premium</li>
          <li>Transporte privativo</li>
          <li>Guia especializado dedicado</li>
        </ul>
        <p class="mb-1"><strong>Atividades Especiais:</strong></p>
        <ul class="list-disc list-inside ml-4 mb-2">
          <li>Voo panorâmico sobre os cânions</li>
          <li>Jantar exclusivo às margens do Rio São Francisco</li>
          <li>Workshop de artesanato local</li>
          <li>Encontro com artistas regionais</li>
          <li>Passeio de canoa de tolda tradicional</li>
        </ul>
        <p class="mt-4"><strong>Valor:</strong> A partir de R$ 1.200 por pessoa</p>
        <p><strong>Inclui:</strong> Tudo mencionado + experiências exclusivas</p>
      `
    }

    // Personalizar baseado nas experiências selecionadas
    if (experiencias.includes('aventura')) {
      roteiroHtml += '<p class="mt-4">🏔️ <strong>Extras de Aventura:</strong> Trilhas, rapel, escalaminhada</p>'
    }
    if (experiencias.includes('gastronomia')) {
      roteiroHtml += '<p class="mt-4">🍽️ <strong>Experiências Gastronômicas:</strong> Pratos típicos, cachaça artesanal</p>'
    }
    if (experiencias.includes('fotografia')) {
      roteiroHtml += '<p class="mt-4">📸 <strong>Tour Fotográfico:</strong> Melhores pontos para fotos, horários ideais</p>'
    }

    setRoteiro(roteiroHtml)
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nome || !formData.email || !formData.dias || !formData.orcamento) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }
    generateRoteiro()
  }

  const whatsappMessage = `Olá! Gostaria de mais informações sobre os roteiros em Piranhas. Meu nome é ${formData.nome}.`
  const whatsappUrl = `https://wa.me/558296173836?text=${encodeURIComponent(whatsappMessage)}`

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch('http://localhost:5001/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roteiroHtml: roteiro, nome: formData.nome, whatsapp: formData.whatsapp }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `roteiro_${formData.nome.replace(/ /g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert('Erro ao gerar PDF. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao baixar PDF:', error);
      alert('Erro ao baixar PDF. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative">
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <img src={logo} alt="Velho Chico Passeios" className="h-16 w-auto" />
            <div className="hidden md:flex space-x-6">
              <a href="#sobre" className="text-white hover:text-accent transition-colors">Sobre</a>
              <a href="#atracoes" className="text-white hover:text-accent transition-colors">Atrações</a>
              <a href="#roteiros" className="text-white hover:text-accent transition-colors">Roteiros</a>
              <a href="#contato" className="text-white hover:text-accent transition-colors">Contato</a>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Descubra Piranhas com
            <span className="block text-accent">Roteiros Personalizados</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Explore as maravilhas do Velho Chico com passeios únicos criados especialmente para você
          </p>
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4 animate-slide-up"
            onClick={() => document.getElementById('roteiros').scrollIntoView({ behavior: 'smooth' })}
          >
            Criar Meu Roteiro Gratuito
          </Button>
        </div>
      </section>

      {/* Por que Piranhas Section */}
      <section id="sobre" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Por que escolher Piranhas?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`card-hover ${isVisible.sobre ? 'animate-slide-up' : ''}`}>
              <CardHeader className="text-center">
                <History className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">História Viva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Centro histórico preservado e a famosa Rota do Cangaço, onde Lampião e Maria Bonita viveram suas últimas aventuras.
                </p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${isVisible.sobre ? 'animate-slide-up' : ''}`}>
              <CardHeader className="text-center">
                <Mountain className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">Natureza Exuberante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Os impressionantes Cânions do São Francisco oferecem paisagens únicas e experiências inesquecíveis.
                </p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${isVisible.sobre ? 'animate-slide-up' : ''}`}>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-xl">Cultura Autêntica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Tradições do sertão nordestino, artesanato local e a hospitalidade única do povo alagoano.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário Gerador de Roteiros */}
      <section id="roteiros" className="py-20 gradient-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="form-container">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">
                  Crie Seu Roteiro Personalizado
                </CardTitle>
                <CardDescription className="text-lg">
                  Preencha o formulário e receba um roteiro gratuito baseado no seu perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="(82) 99999-9999"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dias">Quantos dias ficará em Piranhas? *</Label>
                      <Select onValueChange={(value) => handleInputChange('dias', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione os dias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 dia</SelectItem>
                          <SelectItem value="2">2 dias</SelectItem>
                          <SelectItem value="3">3 dias</SelectItem>
                          <SelectItem value="4">4 dias</SelectItem>
                          <SelectItem value="5">5 dias</SelectItem>
                          <SelectItem value="6">6 dias</SelectItem>
                          <SelectItem value="7">7 dias ou mais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="orcamento">Orçamento por pessoa *</Label>
                      <Select 
                        onValueChange={(value) => handleInputChange('orcamento', value)} 
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o orçamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ate-200">Até R$ 200</SelectItem>
                          <SelectItem value="200-500">R$ 200 - R$ 500</SelectItem>
                          <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                          <SelectItem value="acima-1000">Acima de R$ 1.000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Tipo de experiência preferida (pode escolher várias):</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="aventura" 
                          checked={formData.experiencias.includes('aventura')}
                          onCheckedChange={(checked) => handleExperienceChange('aventura', checked)}
                        />
                        <Label htmlFor="aventura" className="flex items-center"><Mountain className="mr-1" /> Aventura e natureza</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="historia" 
                          checked={formData.experiencias.includes('historia')}
                          onCheckedChange={(checked) => handleExperienceChange('historia', checked)}
                        />
                        <Label htmlFor="historia" className="flex items-center"><History className="mr-1" /> História e cultura</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="gastronomia" 
                          checked={formData.experiencias.includes('gastronomia')}
                          onCheckedChange={(checked) => handleExperienceChange('gastronomia', checked)}
                        />
                        <Label htmlFor="gastronomia" className="flex items-center"><Utensils className="mr-1" /> Gastronomia local</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fotografia" 
                          checked={formData.experiencias.includes('fotografia')}
                          onCheckedChange={(checked) => handleExperienceChange('fotografia', checked)}
                        />
                        <Label htmlFor="fotografia" className="flex items-center"><Camera className="mr-1" /> Fotografia</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="relaxamento" 
                          checked={formData.experiencias.includes('relaxamento')}
                          onCheckedChange={(checked) => handleExperienceChange('relaxamento', checked)}
                        />
                        <Label htmlFor="relaxamento" className="flex items-center"><Heart className="mr-1" /> Relaxamento</Label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full btn-primary text-lg py-3">
                    Gerar Meu Roteiro Gratuito
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Atrações Section */}
      <section id="atracoes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Descubra as Atrações de Piranhas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className={`card-hover ${isVisible.atracoes ? 'animate-slide-up' : ''}`}>
              <img src={centroHistorico} alt="Centro Histórico" className="w-full h-48 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-xl">Centro Histórico</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Passeie pelas ruas de paralelepípedos e admire a arquitetura colonial.</p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${isVisible.atracoes ? 'animate-slide-up' : ''}`}>
              <img src={rotaCangaco} alt="Rota do Cangaço" className="w-full h-48 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-xl">Rota do Cangaço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Explore os caminhos de Lampião e Maria Bonita na Grota do Angico.</p>
              </CardContent>
            </Card>

            <Card className={`card-hover ${isVisible.atracoes ? 'animate-slide-up' : ''}`}>
              <img src={rioSaoFrancisco} alt="Rio São Francisco" className="w-full h-48 object-cover rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-xl">Cânions do São Francisco</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Navegue pelas águas esverdeadas e contemple a grandiosidade dos cânions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Avaliações do Google Section */}
      <section id="depoimentos" className="py-20 gradient-overlay">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Avaliações no Google
          </h2>
          <div className="max-w-4xl mx-auto relative">
            <Card className={`card-hover ${isVisible.depoimentos ? 'animate-slide-up' : ''}`}>
              <CardContent className="pt-8 pb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(googleReviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl italic text-center text-muted-foreground mb-6 leading-relaxed">
                  "{googleReviews[currentReview].text}"
                </p>
                <div className="text-center">
                  <p className="font-semibold text-lg text-primary">{googleReviews[currentReview].author}</p>
                  <p className="text-sm text-muted-foreground">{googleReviews[currentReview].date}</p>
                  <Badge variant="secondary" className="mt-2">
                    Avaliação do Google Maps
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevReview}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextReview}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {googleReviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentReview(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-gradient">
            Fale Conosco
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 text-primary" />
              <a href="https://wa.me/5582996173836" target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary transition-colors flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 mr-2" />
                <span>+55 82 99617-3836</span>
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-8 h-8 text-primary" />
              <a href="mailto:contato@velhochicopasseios.com" className="text-lg text-muted-foreground hover:text-primary transition-colors">
                contato@velhochicopasseios.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-primary" />
              <a href="https://maps.app.goo.gl/xManV74nSiQopoFK9" target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground hover:text-primary transition-colors">Piranhas, Alagoas</a>
            </div>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <a href="https://www.instagram.com/velhochicopasseios/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573836445566" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
              <Facebook className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 text-white text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Velho Chico Passeios. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Roteiro Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] p-6 bg-card text-card-foreground rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Seu Roteiro Personalizado</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Roteiro criado especialmente para {formData.nome}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-secondary/20 rounded-md max-h-[60vh] overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: roteiro }} />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <Button asChild className="btn-whatsapp">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-4 w-4" /> Confirmar pelo WhatsApp
              </a>
            </Button>
            <Button onClick={handleDownloadPdf} className="btn-secondary">
              <Download className="mr-2 h-4 w-4" /> Baixar Roteiro em PDF
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App


