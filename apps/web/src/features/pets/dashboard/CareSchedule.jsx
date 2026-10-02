export function CareScheduleCard({ schedule }) {
  const {
    setShowScheduleModal,
    reminders,
    getDDay,
    toggleReminderComplete,
    handleDeleteReminder,
    setNewReminder
  } = schedule;
  return (
    <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(226, 232, 240, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>⏰</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#0b0f19', margin: 0 }}>
                    케어 일정 & D-Day
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(true)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    background: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#db2777',
                    cursor: 'pointer'
                  }}
                >
                  + 일정 등록
                </button>
              </div>

              {reminders && reminders.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {reminders.map(rem => {
                    const dDayText = getDDay(rem.targetDate);
                    const isUrgent = dDayText.includes('D-') && parseInt(dDayText.replace('D-', '')) <= 10;
                    return (
                      <div
                        key={rem.id}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '12px',
                          border: rem.completed ? '1px solid #cbd5e1' : isUrgent ? '1.5px solid #fbbf24' : '1px solid #e2e8f0',
                          background: rem.completed ? '#f8fafc' : isUrgent ? '#fffbeb' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{rem.icon || '💊'}</span>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: '800', color: rem.completed ? '#94a3b8' : '#0f172a', textDecoration: rem.completed ? 'line-through' : 'none' }}>
                              {rem.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              {rem.targetDate ? rem.targetDate.slice(5) : ''}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            background: rem.completed ? '#e2e8f0' : isUrgent ? '#fef3c7' : '#ecfdf5',
                            color: rem.completed ? '#64748b' : isUrgent ? '#b45309' : '#047857'
                          }}>
                            {rem.completed ? '완료' : dDayText}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleReminderComplete(rem.id)}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '12px' }}
                          >
                            {rem.completed ? '↩️' : '✔️'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReminder(rem.id);
                            }}
                            style={{
                              border: 'none',
                              background: '#fee2e2',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '11px',
                              color: '#ef4444',
                              padding: '2px 6px',
                              fontWeight: 'bold',
                              marginLeft: '2px'
                            }}
                            title="일정 삭제"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ background: '#fafbfc', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '20px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b', marginBottom: '4px' }}>
                    등록된 일정이 없습니다
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                    추천 일정을 클릭하여 빠르게 등록해 보세요
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setNewReminder({ title: '종합백신 접종', targetDate: '2026-10-15', tag: '백신', icon: '💉' });
                        setShowScheduleModal(true);
                      }}
                      style={{ padding: '4px 10px', borderRadius: '9999px', border: '1px solid #fbcfe8', background: '#fdf2f8', color: '#db2777', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + 💉 종합백신
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewReminder({ title: '심장사상충 예방약', targetDate: '2026-09-25', tag: '예방약', icon: '💊' });
                        setShowScheduleModal(true);
                      }}
                      style={{ padding: '4px 10px', borderRadius: '9999px', border: '1px solid #bfdbfe', background: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + 💊 심장사상충
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '12px', textAlign: 'center' }}>
              캘린더 기반 D-Day 알림 연동
            </div>
          </div>
  );
}

export function CareScheduleModal({ schedule }) {
  const {
    showScheduleModal,
    setShowScheduleModal,
    handleAddReminder,
    setNewReminder,
    newReminder
  } = schedule;
  return (
    <>
      {showScheduleModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(11, 15, 25, 0.45)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="fade-in" style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '32px 28px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 25px 60px -15px rgba(11, 15, 25, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>⏰</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                    케어 일정 & D-Day 등록
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    백신, 정기 검진, 심장사상충 일정을 캘린더에 추가하세요.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowScheduleModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReminder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  일정 분류 태그
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                  {[
                    { tag: '예방약', icon: '💊' },
                    { tag: '백신', icon: '💉' },
                    { tag: '검진', icon: '🩺' },
                    { tag: '미용', icon: '✂️' },
                    { tag: '기념일', icon: '🎂' }
                  ].map(item => (
                    <button
                      key={item.tag}
                      type="button"
                      onClick={() => setNewReminder({ ...newReminder, tag: item.tag, icon: item.icon })}
                      style={{
                        padding: '10px 4px',
                        borderRadius: '12px',
                        border: newReminder.tag === item.tag ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                        background: newReminder.tag === item.tag ? '#ecfdf5' : '#f8fafc',
                        color: newReminder.tag === item.tag ? '#047857' : '#475569',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                      <span>{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  일정 이름
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 심장사상충 예방약 급여, 1차 정기검진"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  예정일자 (D-Day 기준일)
                </label>
                <input
                  type="date"
                  required
                  value={newReminder.targetDate}
                  onChange={(e) => setNewReminder({ ...newReminder, targetDate: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '13.5px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#64748b', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer' }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="card-hover-lift"
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.28)'
                  }}
                >
                  일정 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
