import DailyCareChatbot from '../../chat/components/DailyCareChatbot';
import TimelineSlider from '../../timeline/components/TimelineSlider';
import usePetHealthDashboard from './usePetHealthDashboard';
import DashboardPetHeader from './DashboardPetHeader';
import HealthMetrics from './HealthMetrics';
import VitalHistoryChart from './VitalHistoryChart';
import VitalProfileCard from './VitalProfileCard';
import { CareRoutineCard, AddCareRoutineModal, BulkCareRoutineModal } from './CareRoutine';
import { CareScheduleCard, CareScheduleModal } from './CareSchedule';
import { DiagnosisSummaryCard, DailyCareSummaryCard } from './DashboardInsights';
import { VitalRecordModal, BulkVitalRecordModal } from './VitalRecordModals';

export default function PetHealthDashboard({
  user,
  selectedPet,
  setSelectedPet,
  pets = [],
  onOpenLogin,
  onNavigateDiagnosis,
  onOpenEditPet,
  onOpenRegisterPet,
  onPetUpdated
}) {
  const {
    currentPet, activeSubTab, setActiveSubTab, recentDiagnosis,
    metrics, history, profile, checklist, schedule, records
  } = usePetHealthDashboard({
    user, selectedPet, setSelectedPet, onPetUpdated
  });

  if (!currentPet) {
    return (
      <section id="dashboard-section" style={{ padding: '60px 0 90px 0', background: 'var(--bg-main)', minHeight: '85vh' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '32px',
            padding: '64px 36px',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 20px 50px -15px rgba(15, 23, 42, 0.06)'
          }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              border: '2px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)'
            }}>
              🐾
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0b0f19', margin: '0 0 12px 0', letterSpacing: '-0.8px' }}>
              등록된 반려동물이 없습니다
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '480px', margin: '0 auto 36px auto', lineHeight: '1.65', fontWeight: '500' }}>
              반려동물을 먼저 등록하시면 실시간 바이탈, 체중 & 체온 변화 곡선, 1초 데일리 케어 루틴을 체계적으로 관리할 수 있습니다.
            </p>

            <button
              type="button"
              onClick={() => {
                if (onOpenRegisterPet) {
                  onOpenRegisterPet();
                } else if (onOpenEditPet) {
                  onOpenEditPet(null);
                }
              }}
              className="card-hover-lift"
              style={{
                padding: '14px 40px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              + 첫 반려동물 등록하기
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard-section" style={{ padding: '36px 0 80px 0', background: 'var(--bg-main)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>

        {/* ============================================================ */}
        {/* 🌟 1. PROFILE HEADER & PET SELECTOR STRIP */}
        {/* ============================================================ */}
        <DashboardPetHeader
          currentPet={currentPet}
          pets={pets}
          setSelectedPet={setSelectedPet}
          onOpenEditPet={onOpenEditPet}
          onOpenRegisterPet={onOpenRegisterPet}
        />

        {/* ============================================================ */}
        {/* 🌟 SUBTAB SEGMENTED CAPSULE BAR (바이탈 / 일상 AI / 타임라인) */}
        {/* ============================================================ */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '26px'
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(241, 245, 249, 0.85)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            {[
              { id: 'phr', label: '바이탈 & 건강 대시보드', icon: '📊' },
              { id: 'daily-ai', label: '일상 맞춤 AI 챗봇', icon: '🤖' },
              { id: 'timeline', label: '증상 경과 타임라인', icon: '🔍' }
            ].map(tab => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className="card-hover-lift"
                  style={{
                    padding: '8px 20px',
                    fontSize: '13px',
                    fontWeight: isActive ? '800' : '600',
                    color: isActive ? '#0b0f19' : '#64748b',
                    background: isActive ? '#ffffff' : 'transparent',
                    border: isActive ? '1px solid rgba(226, 232, 240, 0.9)' : '1px solid transparent',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 4px 14px rgba(15, 23, 42, 0.08)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ fontSize: '15px' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onNavigateDiagnosis}
            type="button"
            className="card-hover-lift"
            style={{
              padding: '9px 20px',
              borderRadius: '9999px',
              fontSize: '12.5px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🩺</span>
            <span>AI 질병 진단 바로가기 ➔</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* SUBTAB 2: 🤖 일상 맞춤 AI 챗봇 뷰 */}
        {/* ============================================================ */}
        {activeSubTab === 'daily-ai' && (
          <DailyCareChatbot selectedPet={currentPet} />
        )}

        {/* ============================================================ */}
        {/* SUBTAB 3: 🔍 증상 경과 관찰 타임라인 뷰 */}
        {/* ============================================================ */}
        {activeSubTab === 'timeline' && (
          <TimelineSlider selectedPet={currentPet} />
        )}

        {/* ============================================================ */}
        {/* SUBTAB 1: 📊 바이탈 & 헬스케어 메인 대시보드 뷰 */}
        {/* ============================================================ */}
        {activeSubTab === 'phr' && (
          <>

        {/* ============================================================ */}
        {/* 🌟 2. 4-BENTO KPI METRICS STRIP (Apple Health Luxury Style) */}
        {/* ============================================================ */}
        <HealthMetrics metrics={metrics} />

        {/* ============================================================ */}
        {/* 🌟 3. MAIN WIDE CARD: 📈 체중 & 체온 변화 추이 차트 */}
        {/* ============================================================ */}
        <VitalHistoryChart history={history} />

        {/* ============================================================ */}
        {/* 🌟 4. LUXURY BALANCED BENTO GRID: ROW 1 (50:50) & ROW 2 (3-COLUMN) */}
        {/* ============================================================ */}

        {/* --- ROW 1: 스마트 바이탈 관리 (50%) & 1초 데일리 케어 루틴 (50%) --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '22px',
          marginBottom: '24px'
        }}>

          {/* LEFT 50%: 🩺 스마트 기초 바이탈 & 건강 프로필 매니저 */}
          <VitalProfileCard profile={profile} />

          {/* RIGHT 50%: 🎯 오늘의 1초 데일리 루틴 케어 */}
          <CareRoutineCard checklist={checklist} />

        </div>


        {/* --- ROW 2: 3-COLUMN BENTO GRID (D-Day 일정, AI 질병 진단 소견, 일상 맞춤 AI) --- */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}>

          {/* Card 1: ⏰ 케어 일정 & 백신 D-Day */}
          <CareScheduleCard schedule={schedule} />

          {/* Card 2: 🩺 최근 AI 질병 진단 리포트 */}
          <DiagnosisSummaryCard onNavigateDiagnosis={onNavigateDiagnosis} recentDiagnosis={recentDiagnosis} />

          {/* Card 3: 🤖 일상 맞춤 AI 즉시 브리핑 */}
          <DailyCareSummaryCard currentPet={currentPet} setActiveSubTab={setActiveSubTab} />

        </div>
        </>
        )}
      </div>


      {/* ============================================================ */}
      {/* 🚀 MODAL 1: 📅 케어 일정 등록 전용 팝업 모달 */}
      {/* ============================================================ */}
      <CareScheduleModal schedule={schedule} />


      {/* ============================================================ */}
      {/* 🚀 MODAL 2: 📈 체중 & 체온 기록 / 수정 전용 팝업 모달 */}
      {/* ============================================================ */}
      <VitalRecordModal records={records} />

      {/* ============================================================ */}
      {/* 🚀 MODAL 3: 🎯 케어 체크리스트 항목 추가 모달 */}
      {/* ============================================================ */}
      <AddCareRoutineModal checklist={checklist} />

      {/* ============================================================ */}
      {/* 🚀 MODAL 3-2: ⚙️ 데일리 케어 루틴 전체 일괄 관리 매니저 모달 */}
      {/* ============================================================ */}
      <BulkCareRoutineModal checklist={checklist} />

      {/* ============================================================ */}
      {/* 🚀 MODAL 4: 📋 체중 & 체온 전체 기록 일괄 편집 모달 (Bulk Table Editor) */}
      {/* ============================================================ */}
      <BulkVitalRecordModal records={records} />




    </section>
  );
}
