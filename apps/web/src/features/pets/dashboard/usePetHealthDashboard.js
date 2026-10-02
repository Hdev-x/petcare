import { useState, useEffect } from 'react';
import { petApi } from '../api/petApi';

export default function usePetHealthDashboard({ user, selectedPet, setSelectedPet, onPetUpdated }) {
  const [activeSubTab, setActiveSubTab] = useState('phr');

  // Real selected pet only (no mock data fallback)
  const currentPet = selectedPet || null;
  const petIdKey = currentPet ? `pet_${currentPet.id}` : 'pet_none';

  // 1. PHR Vitals Profile State (Empty by default)
  const [vitals, setVitals] = useState({
    bodyTemp: '',
    heartRate: '',
    weight: '',
    allergies: '',
    conditions: '',
    medications: ''
  });

  // 2. Daily Checklist Items & State
  const [checklistItems, setChecklistItems] = useState([
    { key: 'water', label: '수분 섭취', desc: '체내 수분 보충' },
    { key: 'walk', label: '산책 30분', desc: '관절 & 스트레스 케어' },
    { key: 'snack', label: '간식 조절', desc: '칼로리 과다 방지' },
    { key: 'medication', label: '소독/약 투여', desc: '처방 케어 지키기' }
  ]);
  const [dailyChecklist, setDailyChecklist] = useState({});
  const [showAddChecklistModal, setShowAddChecklistModal] = useState(false);
  const [newCheckItem, setNewCheckItem] = useState({ label: '', desc: '' });
  const [showBulkChecklistModal, setShowBulkChecklistModal] = useState(false);
  const [bulkChecklistDraft, setBulkChecklistDraft] = useState([]);

  // 3. Vitals & Weight History (Empty by default)
  const [vitalHistory, setVitalHistory] = useState([]);
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [editingLogIndex, setEditingLogIndex] = useState(null);
  const [newLog, setNewLog] = useState({ weight: '', temp: '', date: '' });
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkRecords, setBulkRecords] = useState([]);

  // 4. Care Reminders (Empty by default)
  const [reminders, setReminders] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    targetDate: '',
    tag: '예방약',
    icon: '💊'
  });

  // 5. Recent Diagnosis State
  const [recentDiagnosis, setRecentDiagnosis] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [chartMetric, setChartMetric] = useState('all'); // 'all' | 'weight' | 'temp'

  // Check login state: prop or localStorage fallback
  const isUserLoggedIn = !!user || !!localStorage.getItem('petcare_user');

  useEffect(() => {
    if (!currentPet) {
      setVitals({ bodyTemp: '', heartRate: '', weight: '', allergies: '', conditions: '', medications: '' });
      setVitalHistory([]);
      setReminders([]);
      setDailyChecklist({});
      setRecentDiagnosis(null);
      return;
    }

    // 1. Load Vitals
    const savedVitals = localStorage.getItem(`petcare_vitals_${petIdKey}`);
    if (savedVitals) {
      try {
        setVitals(JSON.parse(savedVitals));
      } catch (e) {}
    } else {
      setVitals({
        bodyTemp: currentPet.bodyTemp || currentPet.healthProfile?.bodyTemp || '',
        heartRate: currentPet.heartRate || currentPet.healthProfile?.heartRate || '',
        weight: currentPet.weight ? String(currentPet.weight).replace('kg', '') : '',
        allergies: currentPet.allergies || currentPet.healthProfile?.allergies || '',
        conditions: currentPet.conditions || currentPet.healthProfile?.conditions || '',
        medications: currentPet.medications || currentPet.healthProfile?.medications || ''
      });
    }

    // 2. Load Checklist
    const savedCheckItems = localStorage.getItem(`petcare_checkitems_${petIdKey}`);
    if (savedCheckItems) {
      try { setChecklistItems(JSON.parse(savedCheckItems)); } catch (e) {}
    }
    const savedCheck = localStorage.getItem(`petcare_checklist_${petIdKey}`);
    if (savedCheck) {
      try { setDailyChecklist(JSON.parse(savedCheck)); } catch (e) { setDailyChecklist({}); }
    } else {
      setDailyChecklist({});
    }

    // 3. Load Reminders
    const savedReminders = localStorage.getItem(`petcare_reminders_${petIdKey}`);
    if (savedReminders) {
      try { setReminders(JSON.parse(savedReminders)); } catch (e) { setReminders([]); }
    } else {
      setReminders([]);
    }

    // 4. Load Vital History (등록된 기록이 없을 시 반려동물 프로필의 몸무게로 1회차 자동 생성)
    const savedHistory = localStorage.getItem(`petcare_history_${petIdKey}`);
    let loadedHistory = [];
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedHistory = parsed;
        }
      } catch (e) {}
    }

    // 💡 저장된 기록이 없을 때 반려동물 몸무게가 있으면 자동으로 최초 1건의 기초 측정치로 연동 생성
    if (loadedHistory.length === 0 && currentPet.weight) {
      const parsedW = parseFloat(String(currentPet.weight).replace('kg', '')) || 0;
      if (parsedW > 0) {
        const today = new Date();
        const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
        loadedHistory = [{ date: todayStr, weight: parsedW, temp: 38.5 }];
        localStorage.setItem(`petcare_history_${petIdKey}`, JSON.stringify(loadedHistory));
      }
    }
    setVitalHistory(loadedHistory);

    // 5. Load Recent Diagnosis
    const allRecords = localStorage.getItem('petcare_diagnosis_records');
    if (allRecords) {
      try {
        const parsed = JSON.parse(allRecords);
        const petRecords = parsed.filter(r => String(r.petId) === String(currentPet.id));
        if (petRecords.length > 0) {
          setRecentDiagnosis(petRecords[petRecords.length - 1]);
        } else {
          setRecentDiagnosis(null);
        }
      } catch (e) {
        setRecentDiagnosis(null);
      }
    } else {
      setRecentDiagnosis(null);
    }
  }, [currentPet, petIdKey]);

  // 💡 대시보드에서 체중이 변경되었을 때 반려동물 프로필 / 수정 모달 / 백엔드 DB와 양방향 동기화
  const syncPetWeight = (newWeightNum) => {
    if (!currentPet || !newWeightNum || isNaN(newWeightNum)) return;
    const formattedWeight = `${newWeightNum}kg`;
    const updated = {
      ...currentPet,
      weight: formattedWeight
    };
    if (setSelectedPet) setSelectedPet(updated);
    if (onPetUpdated) onPetUpdated(updated);

    if (currentPet.id) {
      petApi.updatePet(currentPet.id, {
        userId: currentPet.userId || 1,
        name: currentPet.name,
        species: currentPet.species,
        breed: currentPet.breed,
        age: currentPet.age,
        weight: formattedWeight,
        icon: currentPet.icon,
        profileImageUrl: currentPet.profileImageUrl
      }).catch(err => console.warn('Pet weight sync to backend failed:', err));
    }
  };

  const handleVitalChange = (e) => {
    const { name, value } = e.target;
    setVitals(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveVitals = (e) => {
    e.preventDefault();
    setIsSaved(true);
    localStorage.setItem(`petcare_vitals_${petIdKey}`, JSON.stringify(vitals));

    // 💡 체온과 체중을 변화 곡선(vitalHistory)에도 자동 동기화 반영
    const w = parseFloat(vitals.weight) || 0;
    const t = parseFloat(vitals.bodyTemp) || 0;

    if (w > 0 || t > 0) {
      const today = new Date();
      const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

      let updatedHistory;
      const todayIdx = vitalHistory.findIndex(h => h.date === todayStr);

      if (todayIdx >= 0) {
        updatedHistory = vitalHistory.map((h, i) =>
          i === todayIdx ? { ...h, weight: w || h.weight, temp: t || h.temp } : h
        );
      } else {
        updatedHistory = [...vitalHistory.slice(-9), { date: todayStr, weight: w || 0, temp: t || 0 }];
      }

      setVitalHistory(updatedHistory);
      localStorage.setItem(`petcare_history_${petIdKey}`, JSON.stringify(updatedHistory));
    }

    if (w > 0) {
      syncPetWeight(w);
    } else if (selectedPet && setSelectedPet) {
      const updated = {
        ...selectedPet,
        healthProfile: vitals
      };
      setSelectedPet(updated);
      if (onPetUpdated) onPetUpdated(updated);
    }
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleDailyCheck = (key) => {
    setDailyChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`petcare_checklist_${petIdKey}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddCustomCheckItem = (e) => {
    e.preventDefault();
    if (!newCheckItem.label.trim()) return;
    const key = `custom_${Date.now()}`;
    const newItem = {
      key,
      label: newCheckItem.label,
      desc: newCheckItem.desc || '맞춤 케어'
    };
    const updatedList = [...checklistItems, newItem];
    setChecklistItems(updatedList);
    localStorage.setItem(`petcare_checkitems_${petIdKey}`, JSON.stringify(updatedList));
    setNewCheckItem({ label: '', desc: '' });
    setShowAddChecklistModal(false);
  };

  const handleOpenBulkChecklist = () => {
    setBulkChecklistDraft(checklistItems.map(item => ({ ...item })));
    setShowBulkChecklistModal(true);
  };

  const handleUpdateBulkDraftItem = (index, field, value) => {
    setBulkChecklistDraft(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleAddBulkDraftRow = () => {
    const key = `custom_${Date.now()}`;
    setBulkChecklistDraft(prev => [...prev, { key, label: '', desc: '' }]);
  };

  const handleDeleteBulkDraftRow = (index) => {
    setBulkChecklistDraft(prev => prev.filter((_, i) => i !== index));
  };

  const handleResetBulkDraftToDefault = () => {
    setBulkChecklistDraft([
      { key: 'water', label: '수분 섭취', desc: '체내 수분 보충' },
      { key: 'walk', label: '산책 30분', desc: '관절 & 스트레스 케어' },
      { key: 'snack', label: '간식 조절', desc: '칼로리 과다 방지' },
      { key: 'medication', label: '소독/약 투여', desc: '처방 케어 지키기' }
    ]);
  };

  const handleSaveBulkChecklist = (e) => {
    if (e) e.preventDefault();
    const validItems = bulkChecklistDraft.filter(item => item.label && item.label.trim().length > 0);
    setChecklistItems(validItems);
    localStorage.setItem(`petcare_checkitems_${petIdKey}`, JSON.stringify(validItems));

    // 삭제된 키는 dailyChecklist에서도 정리
    const validKeySet = new Set(validItems.map(item => item.key));
    setDailyChecklist(prev => {
      const next = {};
      Object.keys(prev).forEach(k => {
        if (validKeySet.has(k)) next[k] = prev[k];
      });
      localStorage.setItem(`petcare_checklist_${petIdKey}`, JSON.stringify(next));
      return next;
    });

    setShowBulkChecklistModal(false);
  };

  const handleDeleteCheckItem = (e, key) => {
    e.stopPropagation();
    const updated = checklistItems.filter(item => item.key !== key);
    setChecklistItems(updated);
    localStorage.setItem(`petcare_checkitems_${petIdKey}`, JSON.stringify(updated));
    setDailyChecklist(prev => {
      const next = { ...prev };
      delete next[key];
      localStorage.setItem(`petcare_checklist_${petIdKey}`, JSON.stringify(next));
      return next;
    });
  };

  const completedCount = checklistItems.filter(item => dailyChecklist[item.key]).length;
  const completionRate = checklistItems.length > 0 ? Math.round((completedCount / checklistItems.length) * 100) : 0;

  const handleOpenAddLog = () => {
    setEditingLogIndex(null);
    setNewLog({ weight: vitals.weight || '', temp: vitals.bodyTemp || '', date: '' });
    setShowAddLogModal(true);
  };

  const handleOpenEditLog = (idx) => {
    const target = vitalHistory[idx];
    if (!target) return;
    setEditingLogIndex(idx);
    setNewLog({
      weight: target.weight !== undefined ? String(target.weight) : '',
      temp: target.temp !== undefined ? String(target.temp) : '',
      date: target.date || ''
    });
    setShowAddLogModal(true);
  };

  const handleDeleteVitalRecord = (idx) => {
    if (!window.confirm('선택하신 측정치 기록을 삭제하시겠습니까?')) return;
    const updated = vitalHistory.filter((_, i) => i !== idx);
    setVitalHistory(updated);
    localStorage.setItem(`petcare_history_${petIdKey}`, JSON.stringify(updated));
  };

  const handleSaveVitalRecord = (e) => {
    e.preventDefault();
    if (!newLog.weight && !newLog.temp) return;
    const w = parseFloat(newLog.weight) || (vitals.weight ? parseFloat(vitals.weight) : 0);
    const t = parseFloat(newLog.temp) || (vitals.bodyTemp ? parseFloat(vitals.bodyTemp) : 0);

    let dateStr = newLog.date;
    if (!dateStr) {
      const today = new Date();
      dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
    } else {
      dateStr = dateStr.includes('-') ? dateStr.slice(5).replace('-', '/') : dateStr;
    }

    let updatedHistory;
    if (editingLogIndex !== null && editingLogIndex >= 0) {
      // 수정 모드
      updatedHistory = vitalHistory.map((item, idx) => {
        if (idx === editingLogIndex) {
          return { ...item, weight: w, temp: t, date: dateStr };
        }
        return item;
      });
    } else {
      // 신규 추가 모드
      updatedHistory = [...vitalHistory.slice(-9), { date: dateStr, weight: w, temp: t }];
    }

    setVitalHistory(updatedHistory);
    localStorage.setItem(`petcare_history_${petIdKey}`, JSON.stringify(updatedHistory));

    if (w > 0) {
      setVitals(prev => ({ ...prev, weight: String(w) }));
      syncPetWeight(w);
    }
    if (t > 0) setVitals(prev => ({ ...prev, bodyTemp: String(t) }));

    setNewLog({ weight: '', temp: '', date: '' });
    setEditingLogIndex(null);
    setShowAddLogModal(false);
  };

  // 🌟 Bulk Vital History Table Editor Handlers
  const handleOpenBulkModal = () => {
    if (vitalHistory && vitalHistory.length > 0) {
      setBulkRecords(vitalHistory.map(r => ({
        date: r.date || '',
        weight: r.weight !== undefined ? String(r.weight) : '',
        temp: r.temp !== undefined ? String(r.temp) : ''
      })));
    } else {
      const today = new Date();
      const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
      setBulkRecords([
        { date: todayStr, weight: vitals.weight || '', temp: vitals.bodyTemp || '' }
      ]);
    }
    setShowBulkModal(true);
  };

  const handleAddBulkRow = () => {
    const today = new Date();
    const todayStr = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
    setBulkRecords(prev => [...prev, { date: todayStr, weight: '', temp: '' }]);
  };

  const handleUpdateBulkRow = (idx, field, value) => {
    setBulkRecords(prev => prev.map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleDeleteBulkRow = (idx) => {
    setBulkRecords(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveBulkRecords = (e) => {
    if (e) e.preventDefault();
    const validRecords = bulkRecords
      .filter(r => (r.weight && !isNaN(parseFloat(r.weight))) || (r.temp && !isNaN(parseFloat(r.temp))))
      .map(r => ({
        date: r.date ? (r.date.includes('-') ? r.date.slice(5).replace('-', '/') : r.date) : '01/01',
        weight: parseFloat(r.weight) || 0,
        temp: parseFloat(r.temp) || 0
      }));

    setVitalHistory(validRecords);
    localStorage.setItem(`petcare_history_${petIdKey}`, JSON.stringify(validRecords));

    if (validRecords.length > 0) {
      const last = validRecords[validRecords.length - 1];
      if (last.weight > 0) {
        setVitals(prev => ({ ...prev, weight: String(last.weight) }));
        syncPetWeight(last.weight);
      }
      if (last.temp > 0) setVitals(prev => ({ ...prev, bodyTemp: String(last.temp) }));
    }

    setShowBulkModal(false);
  };



  const getDDay = (targetDateStr) => {
    if (!targetDateStr) return 'D-Day';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return '오늘';
    if (diffDays > 0) return `D-${diffDays}`;
    return `D+${Math.abs(diffDays)}`;
  };

  const toggleReminderComplete = (id) => {
    setReminders(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
      localStorage.setItem(`petcare_reminders_${petIdKey}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteReminder = (id) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem(`petcare_reminders_${petIdKey}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title.trim() || !newReminder.targetDate) return;

    let icon = '💊';
    if (newReminder.tag === '백신') icon = '💉';
    else if (newReminder.tag === '검진') icon = '🩺';
    else if (newReminder.tag === '미용') icon = '✂️';
    else if (newReminder.tag === '기념일') icon = '🎂';

    const newEntry = {
      id: `rem_${Date.now()}`,
      title: newReminder.title,
      targetDate: newReminder.targetDate,
      tag: newReminder.tag || '예방약',
      icon: icon,
      completed: false
    };
    const updated = [...reminders, newEntry].sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    setReminders(updated);
    localStorage.setItem(`petcare_reminders_${petIdKey}`, JSON.stringify(updated));
    setNewReminder({ title: '', targetDate: '', tag: '예방약', icon: '💊' });
    setShowScheduleModal(false);
  };

  // ------------------------------------------------------------
  // 🌟 CASE 1: 등록된 반려동물이 없는 경우 (Clean Empty State)
  // ------------------------------------------------------------

  if (!currentPet) return { currentPet };


  // ------------------------------------------------------------
  // 🌟 CASE 2: 반려동물이 선택된 경우 (Apple Health High-End Dashboard)
  // ------------------------------------------------------------
  const nextReminder = reminders && reminders.length > 0 ? reminders.find(r => !r.completed) || reminders[0] : null;

  // 💡 변화 곡선(vitalHistory)과 100% 실시간 연동되는 최신 체온/체중 및 변화량
  const latestVitalRecord = vitalHistory && vitalHistory.length > 0 ? vitalHistory[vitalHistory.length - 1] : null;
  const prevVitalRecord = vitalHistory && vitalHistory.length > 1 ? vitalHistory[vitalHistory.length - 2] : null;

  const currentTemp = (latestVitalRecord?.temp && Number(latestVitalRecord.temp) > 0)
    ? String(latestVitalRecord.temp)
    : (vitals.bodyTemp || '');

  const currentWeight = (latestVitalRecord?.weight && Number(latestVitalRecord.weight) > 0)
    ? String(latestVitalRecord.weight)
    : (vitals.weight || (currentPet?.weight ? String(currentPet.weight).replace('kg', '') : ''));

  const tempDiff = (latestVitalRecord?.temp && prevVitalRecord?.temp)
    ? (parseFloat(latestVitalRecord.temp) - parseFloat(prevVitalRecord.temp)).toFixed(1)
    : null;

  const weightDiff = (latestVitalRecord?.weight && prevVitalRecord?.weight)
    ? (parseFloat(latestVitalRecord.weight) - parseFloat(prevVitalRecord.weight)).toFixed(1)
    : null;

  return {
    currentPet, activeSubTab, setActiveSubTab, recentDiagnosis,
    metrics: {
      currentTemp,
      tempDiff,
      weightDiff,
      vitalHistory,
      currentWeight,
      currentPet,
      completionRate,
      checklistItems,
      completedCount,
      nextReminder,
      getDDay
    },
    history: {
      handleOpenBulkModal,
      handleOpenAddLog,
      vitalHistory,
      setChartMetric,
      chartMetric
    },
    profile: {
      isSaved,
      handleSaveVitals,
      vitals,
      currentTemp,
      handleVitalChange,
      currentWeight
    },
    checklist: {
      handleOpenBulkChecklist,
      setShowAddChecklistModal,
      completionRate,
      completedCount,
      checklistItems,
      dailyChecklist,
      toggleDailyCheck,
      handleResetBulkDraftToDefault,
      showAddChecklistModal,
      handleAddCustomCheckItem,
      newCheckItem,
      setNewCheckItem,
      showBulkChecklistModal,
      setShowBulkChecklistModal,
      bulkChecklistDraft,
      handleUpdateBulkDraftItem,
      handleDeleteBulkDraftRow,
      handleAddBulkDraftRow,
      handleSaveBulkChecklist
    },
    schedule: {
      setShowScheduleModal,
      reminders,
      getDDay,
      toggleReminderComplete,
      handleDeleteReminder,
      setNewReminder,
      showScheduleModal,
      handleAddReminder,
      newReminder
    },
    records: {
      showAddLogModal,
      editingLogIndex,
      setShowAddLogModal,
      setEditingLogIndex,
      handleSaveVitalRecord,
      newLog,
      setNewLog,
      showBulkModal,
      setShowBulkModal,
      handleSaveBulkRecords,
      bulkRecords,
      handleUpdateBulkRow,
      handleDeleteBulkRow,
      handleAddBulkRow
    }
  };
}
