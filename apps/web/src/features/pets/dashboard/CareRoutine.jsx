export function CareRoutineCard({ checklist }) {
  const {
    handleOpenBulkChecklist,
    setShowAddChecklistModal,
    completionRate,
    completedCount,
    checklistItems,
    dailyChecklist,
    toggleDailyCheck,
    handleResetBulkDraftToDefault
  } = checklist;
  return (
    <div className="card-hover-lift" style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '26px',
            padding: '28px',
            border: '1px solid rgba(226, 232, 240, 0.85)',
            boxShadow: '0 8px 30px -8px rgba(15, 23, 42, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid rgba(226, 232, 240, 0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>🎯</span>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                      오늘의 1초 데일리 케어
                    </h3>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                      원터치 건강 습관 기록 및 실천
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={handleOpenBulkChecklist}
                    className="card-hover-lift"
                    style={{
                      padding: '6px 13px',
                      borderRadius: '9999px',
                      border: '1.5px solid #a7f3d0',
                      background: '#ecfdf5',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#047857',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.1)'
                    }}
                    title="전체 루틴 목록을 한눈에 확인하고 한번에 수정/삭제/추가합니다"
                  >
                    ⚙️ 루틴 일괄 관리
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddChecklistModal(true)}
                    style={{
                      padding: '6px 13px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      background: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#334155',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
                    }}
                  >
                    + 추가
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '16px', background: '#f8fafc', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800', color: '#0b0f19', marginBottom: '8px' }}>
                  <span>오늘의 달성도</span>
                  <span style={{ color: '#059669', fontWeight: '900' }}>{completionRate}% ({completedCount}/{checklistItems.length})</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${completionRate}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
                    borderRadius: '9999px',
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {checklistItems && checklistItems.length > 0 ? (
                  checklistItems.map(item => {
                    const isDone = !!dailyChecklist[item.key];
                    return (
                      <div
                        key={item.key}
                        onClick={() => toggleDailyCheck(item.key)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '14px',
                          border: isDone ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                          background: isDone ? '#ecfdf5' : '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '18px' }}>{isDone ? '✅' : '⚪'}</span>
                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: '800', color: isDone ? '#047857' : '#0f172a', textDecoration: isDone ? 'line-through' : 'none' }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: isDone ? '#059669' : '#94a3b8',
                          background: isDone ? '#d1fae5' : '#f1f5f9',
                          padding: '3px 8px',
                          borderRadius: '9999px'
                        }}>
                          {isDone ? '완료' : '터치하여 체크'}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ background: '#fafbfc', borderRadius: '16px', border: '1px dashed #e2e8f0', padding: '24px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
                      등록된 데일리 케어 루틴이 없습니다.
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddChecklistModal(true)}
                        style={{ padding: '6px 14px', borderRadius: '9999px', border: 'none', background: '#10b981', color: '#ffffff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        + 새 루틴 추가
                      </button>
                      <button
                        type="button"
                        onClick={handleResetBulkDraftToDefault}
                        style={{ padding: '6px 14px', borderRadius: '9999px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#475569', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        🔄 기본 루틴 복원
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '16px', background: '#f8fafc', padding: '10px 14px', borderRadius: '12px', fontSize: '11.5px', color: '#64748b', textAlign: 'center' }}>
              💡 터치 한 번으로 완료 상태가 브라우저에 실시간 저장됩니다.
            </div>
          </div>
  );
}

export function AddCareRoutineModal({ checklist }) {
  const {
    showAddChecklistModal,
    setShowAddChecklistModal,
    handleAddCustomCheckItem,
    newCheckItem,
    setNewCheckItem
  } = checklist;
  return (
    <>
      {showAddChecklistModal && (
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
            maxWidth: '400px',
            boxShadow: '0 25px 60px -15px rgba(11, 15, 25, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>🎯</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                    맞춤 케어 항목 추가
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    매일 실천할 데일리 케어 루틴을 등록하세요.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddChecklistModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomCheckItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  케어 항목명
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 🪥 치아 양치질, 🪮 털 빗질"
                  value={newCheckItem.label}
                  onChange={(e) => setNewCheckItem({ ...newCheckItem, label: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  간단한 설명
                </label>
                <input
                  type="text"
                  placeholder="예: 치석 예방 및 잇몸 관리"
                  value={newCheckItem.desc}
                  onChange={(e) => setNewCheckItem({ ...newCheckItem, desc: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddChecklistModal(false)}
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
                  체크리스트에 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function BulkCareRoutineModal({ checklist }) {
  const {
    showBulkChecklistModal,
    setShowBulkChecklistModal,
    bulkChecklistDraft,
    handleUpdateBulkDraftItem,
    handleDeleteBulkDraftRow,
    handleAddBulkDraftRow,
    handleResetBulkDraftToDefault,
    handleSaveBulkChecklist
  } = checklist;
  return (
    <>
      {showBulkChecklistModal && (
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
            maxWidth: '560px',
            boxShadow: '0 25px 60px -15px rgba(11, 15, 25, 0.25)',
            border: '1px solid rgba(226, 232, 240, 0.9)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>⚙️</span>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.3px' }}>
                    데일리 케어 루틴 일괄 관리
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    전체 루틴을 한눈에 확인하고 이름/설명 수정, 삭제, 추가를 한번에 저장합니다.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkChecklistModal(false)}
                style={{ border: 'none', background: 'transparent', fontSize: '18px', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Bulk Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '340px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>
              {bulkChecklistDraft.map((item, i) => (
                <div
                  key={item.key || `draft_${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    background: '#f8fafc',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', width: '20px', textAlign: 'center' }}>
                    {i + 1}
                  </span>

                  {/* 항목명 */}
                  <input
                    type="text"
                    required
                    placeholder="루틴 항목명 (예: 수분 섭취)"
                    value={item.label}
                    onChange={(e) => handleUpdateBulkDraftItem(i, 'label', e.target.value)}
                    style={{
                      flex: 1.2,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />

                  {/* 설명 */}
                  <input
                    type="text"
                    placeholder="간단한 설명 (선택)"
                    value={item.desc}
                    onChange={(e) => handleUpdateBulkDraftItem(i, 'desc', e.target.value)}
                    style={{
                      flex: 1.5,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '12.5px',
                      color: '#475569',
                      outline: 'none'
                    }}
                  />

                  {/* 행 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleDeleteBulkDraftRow(i)}
                    style={{
                      border: 'none',
                      background: '#fee2e2',
                      color: '#ef4444',
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '800'
                    }}
                    title="이 루틴 삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {bulkChecklistDraft.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '13px' }}>
                  등록된 루틴이 없습니다. 아래의 [+ 새 루틴 행 추가] 또는 [기본 루틴 복원]을 눌러보세요.
                </div>
              )}
            </div>

            {/* Sub actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={handleAddBulkDraftRow}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px dashed #10b981',
                  background: '#ecfdf5',
                  color: '#059669',
                  fontSize: '12.5px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                + 새 루틴 행 추가
              </button>

              <button
                type="button"
                onClick={handleResetBulkDraftToDefault}
                style={{
                  padding: '7px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  color: '#64748b',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🔄 기본 4대 루틴으로 초기화
              </button>
            </div>

            {/* Bottom Form Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowBulkChecklistModal(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '14px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#64748b',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveBulkChecklist}
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
                💾 전체 수정사항 일괄 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
