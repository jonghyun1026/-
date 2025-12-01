import React, { useState } from 'react';
import { ArrowRight, Check, Star, Download, Users, Code, Layout, ExternalLink, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionId, PortfolioItem, TemplateItem, CourseItem, FormStatus } from '../types';
import { Button, Card, Input, Textarea, Modal } from './ui';

// --- Mock Data ---
const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: '자동 온보딩 포털',
    description: '계약 서명 및 슬랙 초대 자동화 시스템.',
    fullDescription: '이 도구는 온보딩 시간을 80% 단축합니다. 구글 폼, DocuSign, Slack API를 연동하여 계정을 자동으로 생성하고 웰컴 키트를 발송합니다.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    tags: ['HR Tech', '자동화', 'Slack API']
  },
  {
    id: '2',
    title: '급여 대시보드',
    description: '스타트업을 위한 급여 분석 시각화.',
    fullDescription: '월간 소진율(Burn rate), 세금 공제, 초과 근무 비용을 시각화하는 React 기반 대시보드입니다. Recharts를 사용했습니다.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    tags: ['재무', '대시보드', 'React']
  },
  {
    id: '3',
    title: '성과 리뷰 봇',
    description: '슬랙용 AI 피드백 수집기.',
    fullDescription: '팀원들에게 주간 펄스 체크를 요청하고, HR 매니저를 위해 감성 분석 결과를 집계하는 슬랙 봇입니다.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    tags: ['AI', '봇', '피드백']
  }
];

const templates: TemplateItem[] = [
  {
    id: 't1',
    title: '휴가 관리 트래커',
    category: '행정/총무',
    price: '무료',
    description: '직원 휴가를 추적하는 간단한 구글 시트 + AppSheet 템플릿입니다.',
    features: ['모바일 앱', '이메일 알림', '캘린더 연동']
  },
  {
    id: 't2',
    title: '채용 칸반 보드',
    category: '채용',
    price: '₩29,000',
    description: '자동 이메일 발송 기능이 있는 노션 스타일 지원자 추적 시스템.',
    features: ['드래그 앤 드롭', '이메일 템플릿', '상태 분석']
  },
  {
    id: 't3',
    title: '만족도 조사 분석기',
    category: '데이터 분석',
    price: '₩49,000',
    description: 'CSV 설문 결과를 감성 분석하는 파이썬 스크립트.',
    features: ['NLP 처리', '워드 클라우드', '트렌드 리포트']
  }
];

const courses: CourseItem[] = [
  {
    id: 'c1',
    type: 'study',
    title: '그로스 클럽: HR 자동화 101',
    date: '2026년 1월 10일 시작',
    description: '4주 코호트 스터디. 나만의 첫 자동화 도구를 만들어봅니다.',
    targetAudience: 'HR 주니어 및 제너럴리스트'
  },
  {
    id: 'c2',
    type: 'lecture',
    title: '바이브 코딩 마스터클래스',
    date: '2026년 2월 15일',
    description: 'AI를 활용해 내부 도구를 생성하는 방법을 배우는 원데이 집중 워크숍.',
    targetAudience: 'HR 매니저 및 테크 애호가'
  }
];

const chartData = [
  { name: '1월', efficiency: 40 },
  { name: '2월', efficiency: 55 },
  { name: '3월', efficiency: 70 },
  { name: '4월', efficiency: 85 },
  { name: '5월', efficiency: 95 },
  { name: '6월', efficiency: 100 },
];

// --- Sub-Components ---

export const HeroSection = () => (
  <section id={SectionId.HERO} className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden bg-slate-950">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-50"></div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900/0 to-transparent"></div>
    
    <div className="relative container mx-auto px-6 text-center z-10">
      <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-indigo-200 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default shadow-lg">
        <Sparkles className="mr-2 h-4 w-4 text-indigo-400" />
        <span>신박한 HR의 시작</span>
      </div>
      
      <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 word-keep-all leading-tight drop-shadow-xl">
        바이브 코딩으로 <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">HR을 혁신하세요</span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-300 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 word-keep-all leading-relaxed font-light">
        나만의 도구를 만드는 HR 크리에이터들의 커뮤니티.<br className="hidden md:block"/>
        복잡한 코딩 지식 없이도, 당신의 <span className="text-indigo-400 font-semibold">'바이브'</span>만 있으면 됩니다.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <Button 
          size="lg" 
          onClick={() => document.getElementById(SectionId.STUDY)?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full sm:w-auto text-lg px-10 shadow-indigo-500/20 shadow-2xl"
        >
          그로스 클럽 참여하기
        </Button>
        <button 
          onClick={() => document.getElementById(SectionId.TEMPLATES)?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full sm:w-auto h-14 px-8 text-lg font-medium rounded-lg text-white border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
        >
          템플릿 둘러보기
        </button>
      </div>
    </div>
  </section>
);

export const AboutSection = () => (
  <section id={SectionId.ABOUT} className="py-24 bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-8 word-keep-all leading-tight">
            왜 <span className="text-indigo-600">신박한 바이브코딩</span>인가요?
          </h2>
          <p className="text-lg text-slate-600 mb-8 word-keep-all leading-relaxed">
            기존의 딱딱한 HR 소프트웨어는 잊으세요. 우리 조직의 문화와 프로세스에 딱 맞는 유연한 솔루션을 직접 만들 수 있습니다. 
            '신박한 바이브코딩'은 기술이 아닌 <b>해결책</b>에 집중합니다.
          </p>
          <ul className="space-y-6">
            {[
              "엑셀보다 쉽고, SaaS보다 강력한 맞춤 도구",
              "IT 팀 의존 없이 HR 팀 스스로 구축하는 대시보드",
              "구성원이 감동하는 디테일한 임직원 경험 설계"
            ].map((item, i) => (
              <li key={i} className="flex items-start text-slate-700 font-medium">
                <div className="mr-4 flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 h-96 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Layout size={100} className="text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-slate-500 mb-6 uppercase tracking-wider flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            업무 효율 상승 곡선
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                itemStyle={{ color: '#4f46e5', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="efficiency" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorEff)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </section>
);

export const StudySection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);

  const handleApply = (course: CourseItem) => {
    setSelectedCourse(course);
    setFormStatus(FormStatus.IDLE);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    // Simulate API call
    setTimeout(() => {
      setFormStatus(FormStatus.SUCCESS);
      setTimeout(() => {
        setModalOpen(false);
        setFormStatus(FormStatus.IDLE);
      }, 2000);
    }, 1500);
  };

  return (
    <section id={SectionId.STUDY} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">함께 성장하는 여정</h2>
          <p className="text-slate-600 max-w-2xl mx-auto word-keep-all text-lg">
            혼자 고민하지 마세요. 코호트 스터디와 원데이 클래스를 통해 자동화 기술을 레벨업하고 동료를 만나세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {courses.map(course => (
            <Card key={course.id} className="p-8 flex flex-col items-start hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group border-t-4 border-t-transparent hover:border-t-indigo-500">
              <div className={`mb-6 inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${course.type === 'study' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {course.type === 'study' ? 'Study Group' : 'Masterclass'}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{course.title}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-5 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2"></span>
                {course.date}
              </p>
              <p className="text-slate-600 mb-8 flex-grow leading-relaxed">{course.description}</p>
              <div className="w-full pt-6 border-t border-slate-100 mt-auto">
                 <p className="text-sm text-slate-500 mb-5 flex items-center gap-2">
                   <Users size={16} /> 
                   대상: <span className="font-medium text-slate-700">{course.targetAudience}</span>
                 </p>
                 <Button onClick={() => handleApply(course)} className="w-full">지금 신청하기</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`${selectedCourse?.title} 신청하기`}>
        {formStatus === FormStatus.SUCCESS ? (
          <div className="text-center py-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6 animate-in zoom-in duration-300">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">신청이 완료되었습니다!</h3>
            <p className="text-slate-500">입력하신 이메일로 안내 메일을 발송했습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 py-2">
            <Input id="name" label="이름" required placeholder="홍길동" />
            <Input id="email" type="email" label="이메일 주소" required placeholder="hong@company.com" />
            <Input id="company" label="회사/소속" placeholder="OOO 주식회사" />
            <Textarea id="motivation" label="신청 동기" rows={3} placeholder="업무 자동화에 관심이 많습니다..." />
            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg" isLoading={formStatus === FormStatus.SUBMITTING}>
                신청서 제출하기
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};

export const TemplatesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);

  const handleInquire = (template: TemplateItem) => {
    setSelectedTemplate(template);
    setFormStatus(FormStatus.IDLE);
    setModalOpen(true);
  };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    setTimeout(() => {
      setFormStatus(FormStatus.SUCCESS);
      setTimeout(() => {
        setModalOpen(false);
        setFormStatus(FormStatus.IDLE);
      }, 2000);
    }, 1500);
  };

  return (
    <section id={SectionId.TEMPLATES} className="py-24 bg-slate-50 border-t border-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">신박한 템플릿</h2>
              <p className="text-slate-600 text-lg word-keep-all max-w-xl">
                다른 HR 담당자들이 이미 검증한 솔루션입니다. 복사해서 바로 사용하세요.
              </p>
           </div>
           <Button variant="ghost" className="mt-6 md:mt-0 text-indigo-600 font-semibold hover:bg-indigo-50">
             모든 템플릿 보기 <ArrowRight size={18} className="ml-2"/>
           </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map(template => (
             <Card key={template.id} className="flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-2xl border-0 overflow-hidden group">
               <div className="bg-gradient-to-br from-indigo-50 to-slate-100 h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Layout className="text-indigo-200 h-20 w-20 transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="p-7 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{template.category}</span>
                    <span className="text-sm font-bold text-slate-700">{template.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{template.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">{template.description}</p>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <ul className="space-y-2 mb-6">
                      {template.features.map(f => (
                        <li key={f} className="flex items-center text-xs text-slate-500 font-medium">
                          <Check size={12} strokeWidth={3} className="mr-2 text-indigo-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all" onClick={() => handleInquire(template)}>
                      문의 / 다운로드
                    </Button>
                  </div>
               </div>
             </Card>
          ))}
        </div>
      </div>

       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`문의: ${selectedTemplate?.title}`}>
         {formStatus === FormStatus.SUCCESS ? (
          <div className="text-center py-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
              <Download className="h-8 w-8 text-indigo-600" />
            </div>
            <p className="font-bold text-xl text-slate-900 mb-2">요청이 접수되었습니다!</p>
            <p className="text-sm text-slate-500">다운로드 링크와 상세 가이드를 메일로 보내드렸습니다.</p>
          </div>
         ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
               <p className="text-sm text-indigo-800 word-keep-all font-medium">
                 💡 템플릿 사용법 가이드와 복제 링크를 이메일로 보내드립니다.
               </p>
            </div>
            <Input id="t_name" label="이름" required />
            <Input id="t_email" type="email" label="이메일" required />
            <Textarea id="t_msg" label="추가 문의 (선택)" placeholder="예: 구글 워크스페이스 연동 관련 질문..." />
            <Button type="submit" className="w-full mt-4 h-12" isLoading={formStatus === FormStatus.SUBMITTING}>링크 받기</Button>
          </form>
         )}
       </Modal>
    </section>
  );
};

export const PortfolioSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const openPortfolio = (item: PortfolioItem) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">명예의 전당</h2>
          <p className="text-slate-600 text-lg">다른 멤버들이 <span className="text-indigo-600 font-bold">신박한 바이브코딩</span>으로 무엇을 만들었는지 확인해보세요.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {portfolioItems.map(item => (
            <div key={item.id} onClick={() => openPortfolio(item)} className="group cursor-pointer rounded-2xl bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="text-white font-semibold flex items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    상세 보기 <ExternalLink size={16} className="ml-2"/>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold text-slate-500 tracking-wider bg-slate-100 px-2.5 py-1 rounded-md group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem?.title || ''}>
        {activeItem && (
          <div className="space-y-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
               <img src={activeItem.imageUrl} alt={activeItem.title} className="w-full h-64 object-cover" />
            </div>
            
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {activeItem.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold text-white bg-slate-800 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">프로젝트 소개</h4>
              <p className="text-slate-600 leading-relaxed word-keep-all text-sm md:text-base">{activeItem.fullDescription}</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center"><Code size={16} className="mr-2 text-indigo-500"/> 기술 스택</h4>
              <p className="text-sm text-slate-600 word-keep-all leading-relaxed">
                이 프로젝트는 바이브 코딩 원칙에 따라 최소한의 코드로 최대한의 효율을 낼 수 있도록 설계되었습니다. 
                React 컴포넌트와 자동화 워크플로우 툴(Zapier/Make)을 결합하여 구축되었습니다.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button className="w-full py-6 text-lg">데모 요청하기</Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};