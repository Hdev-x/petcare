export default function DashboardPetHeader({ currentPet, pets, setSelectedPet, onOpenEditPet, onOpenRegisterPet }) {
  return (
    <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
        }}>
          {/* Left: Pet Main Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '62px',
              height: '62px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              border: '2px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 6px 18px rgba(16, 185, 129, 0.15)'
            }}>
              {currentPet.icon || '🐾'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0b0f19', margin: 0, letterSpacing: '-0.6px' }}>
                  {currentPet.name}
                </h2>
                <span style={{ fontSize: '11.5px', color: '#059669', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '9999px', fontWeight: '800' }}>
                  {currentPet.breed || '반려동물'}
                </span>
                <span style={{ fontSize: '11px', color: '#047857', background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '1px solid #86efac', padding: '2px 9px', borderRadius: '9999px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>✨</span>
                  <span>AI 건강 컨디션: 안정 🟢</span>
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{currentPet.species || '반려동물'}</span>
                {currentPet.age && <span>· {currentPet.age}세</span>}
                {currentPet.gender && <span>· {currentPet.gender}</span>}
                {currentPet.neutered && <span>· 중성화 완료</span>}
              </div>
            </div>
          </div>

          {/* Right: Switcher & Edit Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {pets && pets.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(241, 245, 249, 0.85)', padding: '4px 6px', borderRadius: '9999px', border: '1px solid rgba(226, 232, 240, 0.85)' }}>
                {pets.map(pet => {
                  const isCurrent = currentPet.id === pet.id;
                  return (
                    <button
                      key={pet.id}
                      type="button"
                      onClick={() => setSelectedPet(pet)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        border: 'none',
                        background: isCurrent ? '#ffffff' : 'transparent',
                        color: isCurrent ? '#0b0f19' : '#64748b',
                        fontWeight: isCurrent ? '800' : '600',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        boxShadow: isCurrent ? '0 2px 8px rgba(15, 23, 42, 0.08)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {pet.icon || '🐾'} {pet.name}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={() => onOpenEditPet && onOpenEditPet(currentPet)}
              className="card-hover-lift"
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                background: '#ffffff',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
              }}
            >
              ⚙️ 반려동물 정보 수정
            </button>

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
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: '#0b0f19',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(11, 15, 25, 0.2)'
              }}
            >
              + 반려동물 추가
            </button>
          </div>
        </div>
  );
}
