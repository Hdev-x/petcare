import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HomePage from '../pages/home/HomePage';
import DiagnosisPage from '../pages/diagnosis/DiagnosisPage';
import TimelinePage from '../pages/timeline/TimelinePage';
import HospitalsPage from '../pages/hospitals/HospitalsPage';
import NewsPage from '../pages/news/NewsPage';
import CommunityPage from '../pages/community/CommunityPage';
import CommunityDetailPage from '../pages/community/CommunityDetailPage';
import PetHealthDashboard from '../features/pets/dashboard/PetHealthDashboard';
import DailyCareChatbot from '../features/chat/components/DailyCareChatbot';
import LoginPage from '../features/auth/components/LoginPage';
import OAuth2CallbackPage from '../features/auth/components/OAuth2CallbackPage';
import PetEditModal from '../features/pets/components/PetEditModal';
import PetRegisterModal from '../features/pets/components/PetRegisterModal';
import MyPage from '../features/account/components/MyPage';
import Footer from '../shared/ui/Footer';


import { petApi } from '../features/pets/api/petApi';
import { authApi } from '../features/auth/api/authApi';
import { AUTH_EXPIRED_EVENT } from '../shared/api/httpClient';

export default function App() {
  // 커뮤니티 목록에서 "글 상세보기"를 누르면 그 글 번호를 여기에 담고
  // activeTab 을 'community-detail' 로 바꿔 상세 화면을 띄운다.
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [activeTab, setActiveTab] = useState(() => {
    if (window.location.pathname.startsWith('/login') || window.location.search.includes('error=')) {
      return 'login';
    }
    return 'home';
  });
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [editingPet, setEditingPet] = useState(null);
  const [isRegisterPetOpen, setIsRegisterPetOpen] = useState(false);
  const [latestDiagnosis, setLatestDiagnosis] = useState(null);
  const [careFlowLookupRequest, setCareFlowLookupRequest] = useState(0);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('petcare_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Check if current URL is OAuth2 callback
  const [isOAuth2Callback, setIsOAuth2Callback] = useState(() =>
    window.location.pathname.startsWith('/oauth2/callback')
  );

  // Real backend API integration: Fetch Pets on mount and whenever user changes
  useEffect(() => {
    if (isOAuth2Callback) return;
    if (!user || !user.id) {
      setPets([]);
      setSelectedPet(null);
      return;
    }
    let active = true;
    async function loadPets() {
      const data = await petApi.getPetsByUser(user.id);
      // 로그아웃·계정 변경으로 끝난 조회의 응답은 현재 Pet 상태에 적용하지 않는다.
      if (!active) return;
      setPets(data || []);
      if (data && data.length > 0) {
        setSelectedPet(data[0]);
      } else {
        setSelectedPet(null);
      }
    }
    loadPets();
    return () => { active = false; };
  }, [user, isOAuth2Callback]);

  useEffect(() => {
    setLatestDiagnosis(null);
  }, [selectedPet?.id]);

  // Handle auth session expiration (e.g. refresh token failure)
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setPets([]);
      setSelectedPet(null);
      setEditingPet(null);
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, []);

  const handlePetAdded = (newPet) => {
    setPets((prev) => [...prev, newPet]);
    setSelectedPet(newPet);
  };

  const handlePetUpdated = (updatedPet) => {
    setPets((prev) => prev.map(p => p.id === updatedPet.id ? { ...p, ...updatedPet } : p));
    if (selectedPet?.id === updatedPet.id) {
      setSelectedPet(prev => ({ ...prev, ...updatedPet }));
    }
  };

  const handlePetDeleted = (deletedPetId) => {
    setPets((prev) => {
      const filtered = prev.filter(p => p.id !== deletedPetId);
      if (selectedPet?.id === deletedPetId) {
        setSelectedPet(filtered[0] || null);
      }
      return filtered;
    });
  };

  const handleOpenRegisterPet = () => {
    if (!user) {
      alert('🔒 반려동물 등록은 로그인 후 이용하실 수 있습니다.');
      setActiveTab('login');
      return;
    }
    setIsRegisterPetOpen(true);
  };

  const handleOpenEditPet = (petToEdit) => {
    if (petToEdit) {
      setEditingPet(petToEdit);
    } else {
      handleOpenRegisterPet();
    }
  };

  const handleOpenDiagnosisCareFlow = (diagnosisResult) => {
    if (diagnosisResult) setLatestDiagnosis(diagnosisResult);
    setCareFlowLookupRequest((current) => current + 1);
    window.requestAnimationFrame(() => {
      document.getElementById('diagnosis-care-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleNavigateTimeline = (diagnosisResult) => {
    if (diagnosisResult) setLatestDiagnosis(diagnosisResult);
    setActiveTab('timeline');
  };

  // Render content dynamically based on selected Category Tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <PetHealthDashboard
            user={user}
            selectedPet={selectedPet}
            setSelectedPet={setSelectedPet}
            pets={pets}
            onOpenLogin={() => setActiveTab('login')}
            onNavigateDiagnosis={() => setActiveTab('diagnosis')}
            onOpenEditPet={handleOpenEditPet}
            onOpenRegisterPet={handleOpenRegisterPet}
            onPetUpdated={handlePetUpdated}
          />
        );



      case 'daily-ai':
        return (
          <DailyCareChatbot
            selectedPet={selectedPet}
          />
        );

      case 'diagnosis':
        return (
          <DiagnosisPage
            selectedPet={selectedPet}
            pets={pets}
            isAuthenticated={Boolean(user)}
            onSelectPet={setSelectedPet}
            onOpenLogin={() => setActiveTab('login')}
            onOpenPetManagement={() => setActiveTab('dashboard')}
            onNavigateTimeline={handleNavigateTimeline}
            onOpenCareFlow={handleOpenDiagnosisCareFlow}
            onDiagnosisResult={setLatestDiagnosis}
            diagnosisResult={latestDiagnosis}
            lookupRequestId={careFlowLookupRequest}
          />
        );

      case 'timeline':
        return (
          <TimelinePage
            selectedPet={selectedPet}
            sourceDiagnosis={latestDiagnosis}
            onNavigateDiagnosis={() => setActiveTab('diagnosis')}
          />
        );

      case 'hospitals':
        return (
          <HospitalsPage
            user={user}
            onOpenLogin={() => setActiveTab('login')}
          />
        );

      case 'news':
        return (
          <NewsPage />
        );

      case 'community':
        return (
          <CommunityPage
            user={user}
            onOpenLogin={() => setActiveTab('login')}
            onOpenDetail={(postId) => {
              setSelectedPostId(postId);
              setActiveTab('community-detail');
            }}
          />
        );

      case 'community-detail':
        return (
          <CommunityDetailPage
            postId={selectedPostId}
            onBack={() => setActiveTab('community')}
            user={user}
            onOpenLogin={() => setActiveTab('login')}
          />
        );

      case 'login':
        return (
          <LoginPage
            isOpen={true}
            isEmbeddedPage={true}
            onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setActiveTab('home');
            }}
          />
        );

      case 'mypage':

        return (
          <MyPage
            user={user}
            pets={pets}
            onUserUpdated={(updatedUser) => setUser(updatedUser)}
            onLogout={async () => {
              if (!await authApi.logout()) return;
              setUser(null);
              setActiveTab('home');
            }}
            onWithdraw={async () => {
              if (window.confirm('정말로 탈퇴하시겠습니까? 탈퇴 후 기존 정보는 안전하게 보존되지만 로그인이 제한됩니다.')) {
                try {
                  await authApi.withdraw();
                  setUser(null);
                  setActiveTab('home');
                  alert('회원 탈퇴 처리가 완료되었습니다.');
                } catch (e) {
                  alert(e.message || '탈퇴 처리에 실패했습니다.');
                }
              }
            }}
            onNavigateHome={() => setActiveTab('home')}
          />
        );

      case 'home':
      default:



        return (
          <HomePage
            onStartDiagnosis={() => setActiveTab('diagnosis')}
            onNavigateDashboard={() => setActiveTab('dashboard')}
            onFindHospital={() => setActiveTab('hospitals')}
            onNavigateTimeline={() => setActiveTab('timeline')}
          />
        );


    }
  };

  if (isOAuth2Callback) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
        <OAuth2CallbackPage onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setIsOAuth2Callback(false);
          setActiveTab('home');
        }} />
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-main)' }}>
      {/* Top Unified Navbar */}
      <Navbar
        user={user}
        onUserChange={setUser}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        pets={pets}
        onPetAdded={handlePetAdded}
        onOpenEditPet={handleOpenEditPet}
        onOpenRegisterPet={handleOpenRegisterPet}
      />

      {/* Main Dynamic Content */}
      <main style={{ flex: 1, marginTop: '8px' }}>
        {renderTabContent()}
      </main>

      {/* Pet Register Modal */}
      <PetRegisterModal
        isOpen={isRegisterPetOpen}
        onClose={() => setIsRegisterPetOpen(false)}
        onPetCreated={(newPet) => {
          handlePetAdded(newPet);
          setIsRegisterPetOpen(false);
        }}
      />

      {/* Pet Edit Modal */}
      <PetEditModal
        isOpen={!!editingPet}
        onClose={() => setEditingPet(null)}
        pet={editingPet}
        onPetUpdated={handlePetUpdated}
        onPetDeleted={handlePetDeleted}
      />

      {/* Footer */}
      <Footer />



    </div>
  );
}
