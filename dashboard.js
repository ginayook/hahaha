/**
 * 5개년 3개 기업 매출 빅데이터 분석 대시보드 코어 엔진
 * 100% 클라이언트 사이드 (외부 전송 0, 오프라인 완전 지원)
 */

// 차트 인스턴스 보관 객체
const charts = {};

// 테마 상태
let currentTheme = 'dark';
let activeCategory = 'all';

// 색상 팔레트 상수
const COLORS = {
  hanbit: '#38bdf8',
  hanbitLight: 'rgba(56, 189, 248, 0.25)',
  hanbitGlow: 'rgba(56, 189, 248, 0.1)',
  mirae: '#34d399',
  miraeLight: 'rgba(52, 211, 153, 0.25)',
  miraeGlow: 'rgba(52, 211, 153, 0.1)',
  saebom: '#fbbf24',
  saebomLight: 'rgba(251, 191, 36, 0.25)',
  saebomGlow: 'rgba(251, 191, 36, 0.1)',
  total: '#a78bfa',
  totalLight: 'rgba(167, 139, 250, 0.25)',
  gridDark: '#334155',
  gridLight: '#e2e8f0',
  textDark: '#94a3b8',
  textLight: '#475569',
  borderDark: '#475569',
  borderLight: '#cbd5e1'
};

// 헬퍼: 안전한 차트 생성 및 리사이클
function createOrUpdateChart(canvasId, config) {
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  // 기본 테마 설정 주입
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? COLORS.gridDark : COLORS.gridLight;
  const textColor = isDark ? COLORS.textDark : COLORS.textLight;

  if (config.options && config.options.scales) {
    Object.keys(config.options.scales).forEach(scaleKey => {
      const scale = config.options.scales[scaleKey];
      scale.grid = scale.grid || {};
      scale.grid.color = gridColor;
      scale.ticks = scale.ticks || {};
      scale.ticks.color = textColor;
      scale.ticks.font = { family: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' };
    });
  }

  if (config.options && config.options.plugins && config.options.plugins.legend) {
    config.options.plugins.legend.labels = config.options.plugins.legend.labels || {};
    config.options.plugins.legend.labels.color = textColor;
  }

  config.options = config.options || {};
  config.options.responsive = true;
  config.options.maintainAspectRatio = false;

  charts[canvasId] = new Chart(ctx, config);
  return charts[canvasId];
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  if (!window.DATASET || !window.DATASET.monthly) {
    console.error('데이터셋이 로드되지 않았습니다.');
    return;
  }

  initHeaderMetrics();
  initAllTechniques();
  initEventListeners();
});

// 상단 요약 KPI 계산 및 표시
function initHeaderMetrics() {
  const data = window.DATASET.monthly;
  const metrics = window.DATASET.metrics;

  const totalSum = data.reduce((acc, cur) => acc + cur.hanbit + cur.mirae + cur.saebom, 0);
  const hanbitSum = data.reduce((acc, cur) => acc + cur.hanbit, 0);
  const miraeSum = data.reduce((acc, cur) => acc + cur.mirae, 0);
  const saebomSum = data.reduce((acc, cur) => acc + cur.saebom, 0);

  document.getElementById('kpiTotalRev').innerText = totalSum.toFixed(1);
  document.getElementById('kpiTotalCagr').innerText = `+${metrics.cagr.total}%`;

  document.getElementById('kpiHanbitRev').innerText = hanbitSum.toFixed(1);
  document.getElementById('kpiHanbitCagr').innerText = `+${metrics.cagr.hanbit}%`;

  document.getElementById('kpiMiraeRev').innerText = miraeSum.toFixed(1);
  document.getElementById('kpiMiraeCagr').innerText = `+${metrics.cagr.mirae}%`;

  document.getElementById('kpiSaebomRev').innerText = saebomSum.toFixed(1);
  document.getElementById('kpiSaebomCagr').innerText = `${metrics.cagr.saebom}%`;
}

// 20대 기법 일괄 렌더링
function initAllTechniques() {
  renderTech1();
  renderTech2();
  renderTech3();
  renderTech4();
  renderTech5();
  renderTech6();
  renderTech7();
  renderTech8();
  renderTech9();
  renderTech10();
  renderTech11();
  renderTech12();
  renderTech13();
  renderTech14();
  renderTech15();
  renderTech16();
  renderTech17();
  renderTech18();
  renderTech19();
  renderTech20();
}

// -------------------------------------------------------------
// [기법 1] 기술통계 및 5수치 요약 (Descriptive Statistics & Metrics)
// -------------------------------------------------------------
function renderTech1() {
  const d = window.DATASET.metrics.descriptive;
  
  createOrUpdateChart('chartTech1', {
    type: 'bar',
    data: {
      labels: ['평균(Mean)', '중앙값(Median)', '표준편차(Std)', '사분위범위(IQR)', '최솟값(Min)', '최댓값(Max)'],
      datasets: [
        {
          label: '한빛테크',
          data: [d.hanbit.mean, d.hanbit.median, d.hanbit.std, d.hanbit.iqr, d.hanbit.min, d.hanbit.max],
          backgroundColor: COLORS.hanbit,
          borderRadius: 4
        },
        {
          label: '미래솔루션',
          data: [d.mirae.mean, d.mirae.median, d.mirae.std, d.mirae.iqr, d.mirae.min, d.mirae.max],
          backgroundColor: COLORS.mirae,
          borderRadius: 4
        },
        {
          label: '새봄산업',
          data: [d.saebom.mean, d.saebom.median, d.saebom.std, d.saebom.iqr, d.saebom.min, d.saebom.max],
          backgroundColor: COLORS.saebom,
          borderRadius: 4
        }
      ]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} 억원`
          }
        }
      },
      scales: {
        y: { title: { display: true, text: '억원' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 2] 선형 회귀 및 장기 추세선 (OLS Trendline & R² Fit)
// -------------------------------------------------------------
function renderTech2() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const N = raw.length;
  const ols = window.DATASET.metrics.ols;

  // 추세선 계산
  const trendHanbit = labels.map((_, i) => (ols.hanbit.slope * i + ols.hanbit.intercept).toFixed(2));
  const trendMirae = labels.map((_, i) => (ols.mirae.slope * i + ols.mirae.intercept).toFixed(2));
  const trendSaebom = labels.map((_, i) => (ols.saebom.slope * i + ols.saebom.intercept).toFixed(2));

  createOrUpdateChart('chartTech2', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛테크 실적',
          data: raw.map(d => d.hanbit),
          borderColor: COLORS.hanbit,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 2
        },
        {
          label: `한빛 추세선 (월 +${ols.hanbit.slope}억, R²=${ols.hanbit.r2})`,
          data: trendHanbit,
          borderColor: COLORS.hanbit,
          borderDash: [5, 4],
          borderWidth: 2.5,
          pointRadius: 0
        },
        {
          label: '미래솔루션 실적',
          data: raw.map(d => d.mirae),
          borderColor: COLORS.mirae,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 2
        },
        {
          label: `미래 추세선 (월 +${ols.mirae.slope}억, R²=${ols.mirae.r2})`,
          data: trendMirae,
          borderColor: COLORS.mirae,
          borderDash: [5, 4],
          borderWidth: 2.5,
          pointRadius: 0
        },
        {
          label: '새봄산업 실적',
          data: raw.map(d => d.saebom),
          borderColor: COLORS.saebom,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 2
        },
        {
          label: `새봄 추세선 (월 ${ols.saebom.slope}억, R²=${ols.saebom.r2})`,
          data: trendSaebom,
          borderColor: COLORS.saebom,
          borderDash: [5, 4],
          borderWidth: 2.5,
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 3] 연간 누적 매출 및 연평균 성장률(CAGR) 분석
// -------------------------------------------------------------
function renderTech3() {
  const ann = window.DATASET.metrics.annual;
  const years = Object.keys(ann);

  createOrUpdateChart('chartTech3', {
    type: 'bar',
    data: {
      labels: years.map(y => `${y}년`),
      datasets: [
        {
          label: '한빛테크 (CAGR +15.2%)',
          data: years.map(y => ann[y].hanbit),
          backgroundColor: COLORS.hanbit,
          borderRadius: 4
        },
        {
          label: '미래솔루션 (CAGR +8.7%)',
          data: years.map(y => ann[y].mirae),
          backgroundColor: COLORS.mirae,
          borderRadius: 4
        },
        {
          label: '새봄산업 (CAGR -2.4%)',
          data: years.map(y => ann[y].saebom),
          backgroundColor: COLORS.saebom,
          borderRadius: 4
        }
      ]
    },
    options: {
      scales: {
        x: { stacked: false },
        y: { title: { display: true, text: '연간 매출합계 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 4] 전년 동월 대비 증감률(YoY Growth Rate) 분석
// -------------------------------------------------------------
function renderTech4() {
  const raw = window.DATASET.monthly;
  const yoyLabels = [];
  const yoyHanbit = [];
  const yoyMirae = [];
  const yoySaebom = [];

  for (let i = 12; i < raw.length; i++) {
    yoyLabels.push(raw[i].month);
    const prevH = raw[i - 12].hanbit;
    const prevM = raw[i - 12].mirae;
    const prevS = raw[i - 12].saebom;

    yoyHanbit.push(Number(((raw[i].hanbit - prevH) / prevH * 100).toFixed(1)));
    yoyMirae.push(Number(((raw[i].mirae - prevM) / prevM * 100).toFixed(1)));
    yoySaebom.push(Number(((raw[i].saebom - prevS) / prevS * 100).toFixed(1)));
  }

  createOrUpdateChart('chartTech4', {
    type: 'line',
    data: {
      labels: yoyLabels,
      datasets: [
        {
          label: '한빛테크 YoY (%)',
          data: yoyHanbit,
          borderColor: COLORS.hanbit,
          backgroundColor: COLORS.hanbitGlow,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: '미래솔루션 YoY (%)',
          data: yoyMirae,
          borderColor: COLORS.mirae,
          backgroundColor: COLORS.miraeGlow,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: '새봄산업 YoY (%)',
          data: yoySaebom,
          borderColor: COLORS.saebom,
          backgroundColor: COLORS.saebomGlow,
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: {
          title: { display: true, text: 'YoY 성장률 (%)' },
          grid: {
            color: (ctx) => (ctx.tick.value === 0 ? '#ef4444' : (currentTheme === 'light' ? COLORS.gridLight : COLORS.gridDark)),
            lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1)
          }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 5] 전월 대비 증감률(MoM Growth Rate) 및 모멘텀 진폭
// -------------------------------------------------------------
function renderTech5() {
  const raw = window.DATASET.monthly;
  const momLabels = [];
  const momHanbit = [];

  for (let i = 1; i < raw.length; i++) {
    momLabels.push(raw[i].month);
    const prev = raw[i - 1].hanbit;
    momHanbit.push(Number(((raw[i].hanbit - prev) / prev * 100).toFixed(1)));
  }

  createOrUpdateChart('chartTech5', {
    type: 'bar',
    data: {
      labels: momLabels,
      datasets: [
        {
          label: '한빛테크 MoM 증감률 (%)',
          data: momHanbit,
          backgroundColor: momHanbit.map(val => val >= 0 ? '#10b981' : '#f43f5e'),
          borderRadius: 3
        }
      ]
    },
    options: {
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: 'MoM 증감률 (%)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 6] 월별 계절성 지수 및 캘린더 히트맵 분석
// -------------------------------------------------------------
function renderTech6() {
  const seas = window.DATASET.metrics.seasonality;
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const hanbitSeas = [];
  const miraeSeas = [];
  const saebomSeas = [];

  for (let m = 1; m <= 12; m++) {
    hanbitSeas.push(seas[m].hanbit_avg);
    miraeSeas.push(seas[m].mirae_avg);
    saebomSeas.push(seas[m].saebom_avg);
  }

  createOrUpdateChart('chartTech6', {
    type: 'radar',
    data: {
      labels: months,
      datasets: [
        {
          label: '한빛테크 (봄/연말 듀얼피크)',
          data: hanbitSeas,
          borderColor: COLORS.hanbit,
          backgroundColor: COLORS.hanbitLight,
          borderWidth: 2
        },
        {
          label: '미래솔루션 (겨울 피크/여름 저점)',
          data: miraeSeas,
          borderColor: COLORS.mirae,
          backgroundColor: COLORS.miraeLight,
          borderWidth: 2
        },
        {
          label: '새봄산업 (연말 집중/여름 저점)',
          data: saebomSeas,
          borderColor: COLORS.saebom,
          backgroundColor: COLORS.saebomLight,
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        r: {
          angleLines: { color: COLORS.gridDark },
          grid: { color: COLORS.gridDark },
          pointLabels: { font: { size: 11, weight: '600' } }
        }
      }
    }
  });

  // 동적 히트맵 렌더링
  renderHeatmapGrid();
}

function renderHeatmapGrid() {
  const container = document.getElementById('heatmapGrid');
  if (!container) return;

  const raw = window.DATASET.monthly;
  const years = ['2021', '2022', '2023', '2024', '2025'];
  let html = '<div class="heatmap-header">연도</div>';
  for (let m = 1; m <= 12; m++) {
    html += `<div class="heatmap-header">${m}월</div>`;
  }

  years.forEach(year => {
    html += `<div class="heatmap-header" style="text-align:left; font-weight:bold;">${year}</div>`;
    for (let m = 1; m <= 12; m++) {
      const monthStr = `${year}-${String(m).padStart(2, '0')}`;
      const item = raw.find(d => d.month === monthStr);
      const val = item ? (item.hanbit + item.mirae + item.saebom).toFixed(1) : 0;
      
      // 색상 스케일 계산 (20~40억 범위)
      const ratio = Math.max(0, Math.min(1, (val - 20) / 20));
      const bg = `rgba(99, 102, 241, ${0.15 + ratio * 0.75})`;
      const textColor = ratio > 0.5 ? '#ffffff' : '#94a3b8';

      html += `<div class="heatmap-cell" style="background:${bg}; color:${textColor};" title="${monthStr} 총매출: ${val}억원">
        <span style="font-size:0.68rem; opacity:0.8;">${m}월</span>
        <span style="font-size:0.75rem;">${val}</span>
      </div>`;
    }
  });

  container.innerHTML = html;
}

// -------------------------------------------------------------
// [기법 7] 다중 이동평균선(SMA 3/6/12M) 및 골든크로스 분석
// -------------------------------------------------------------
function renderTech7() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const series = raw.map(d => d.hanbit);

  function calcSMA(arr, windowSize) {
    return arr.map((_, idx) => {
      if (idx < windowSize - 1) return null;
      const slice = arr.slice(idx - windowSize + 1, idx + 1);
      return Number((slice.reduce((a, b) => a + b, 0) / windowSize).toFixed(2));
    });
  }

  const sma3 = calcSMA(series, 3);
  const sma6 = calcSMA(series, 6);
  const sma12 = calcSMA(series, 12);

  createOrUpdateChart('chartTech7', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛 실적치',
          data: series,
          borderColor: 'rgba(148, 163, 184, 0.5)',
          borderWidth: 1,
          pointRadius: 1
        },
        {
          label: 'SMA 3개월 (단기)',
          data: sma3,
          borderColor: '#38bdf8',
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'SMA 6개월 (중기)',
          data: sma6,
          borderColor: '#a78bfa',
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: 'SMA 12개월 (장기)',
          data: sma12,
          borderColor: '#f43f5e',
          borderWidth: 2.5,
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 8] 시계열 고전적 가법 분해 (Trend + Seasonal + Residual)
// -------------------------------------------------------------
function renderTech8() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const ols = window.DATASET.metrics.ols.hanbit;
  const seas = window.DATASET.metrics.seasonality;
  const overallMean = window.DATASET.metrics.descriptive.hanbit.mean;

  const observed = raw.map(d => d.hanbit);
  const trend = raw.map((_, i) => Number((ols.slope * i + ols.intercept).toFixed(2)));
  const seasonal = raw.map(d => {
    const m = parseInt(d.month.split('-')[1]);
    return Number((seas[m].hanbit_avg - overallMean).toFixed(2));
  });
  const residual = observed.map((obs, i) => Number((obs - trend[i] - seasonal[i]).toFixed(2)));

  createOrUpdateChart('chartTech8', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '원계열 (Observed)',
          data: observed,
          borderColor: COLORS.hanbit,
          borderWidth: 1.5,
          pointRadius: 1
        },
        {
          label: '추세 성분 (Trend)',
          data: trend,
          borderColor: '#a855f7',
          borderWidth: 2,
          borderDash: [4, 4],
          pointRadius: 0
        },
        {
          label: '계절 성분 (Seasonal Delta)',
          data: seasonal,
          borderColor: '#34d399',
          borderWidth: 1.5,
          pointRadius: 0
        },
        {
          label: '불규칙 잔차 (Residual)',
          data: residual,
          borderColor: '#f43f5e',
          borderWidth: 1,
          pointRadius: 1.5
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '억원' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 9] 통계적 이상치 및 돌발 변동 탐지 (Z-Score & IQR)
// -------------------------------------------------------------
function renderTech9() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const desc = window.DATASET.metrics.descriptive.hanbit;

  // Z-Score 계산
  const upper2Sigma = labels.map(() => (desc.mean + 2 * desc.std).toFixed(2));
  const lower2Sigma = labels.map(() => (desc.mean - 2 * desc.std).toFixed(2));
  
  // 포인트별 스타일 (Z >= 2 이면 붉은색 강조)
  const pointBg = raw.map(d => {
    const z = Math.abs((d.hanbit - desc.mean) / desc.std);
    return z >= 2.0 ? '#ef4444' : COLORS.hanbit;
  });
  const pointRadius = raw.map(d => {
    const z = Math.abs((d.hanbit - desc.mean) / desc.std);
    return z >= 2.0 ? 6 : 2;
  });

  createOrUpdateChart('chartTech9', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛테크 실적치',
          data: raw.map(d => d.hanbit),
          borderColor: COLORS.hanbit,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointBackgroundColor: pointBg,
          pointBorderColor: pointBg,
          pointRadius: pointRadius
        },
        {
          label: '상한선 (+2σ 임계치: 18.08억)',
          data: upper2Sigma,
          borderColor: '#ef4444',
          borderDash: [6, 4],
          borderWidth: 1.5,
          pointRadius: 0
        },
        {
          label: '하한선 (-2σ 임계치: 7.04억)',
          data: lower2Sigma,
          borderColor: '#10b981',
          borderDash: [6, 4],
          borderWidth: 1.5,
          pointRadius: 0
        }
      ]
    },
    options: {
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 10] 볼린저 밴드 및 변동성 채널 분석 (Bollinger Bands 20-MA)
// -------------------------------------------------------------
function renderTech10() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const series = raw.map(d => d.hanbit);
  const windowSize = 12; // 12개월 윈도우

  const ma = [];
  const upperBand = [];
  const lowerBand = [];

  for (let i = 0; i < series.length; i++) {
    if (i < windowSize - 1) {
      ma.push(null);
      upperBand.push(null);
      lowerBand.push(null);
    } else {
      const slice = series.slice(i - windowSize + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / windowSize;
      const variance = slice.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (windowSize - 1);
      const std = Math.sqrt(variance);
      ma.push(Number(mean.toFixed(2)));
      upperBand.push(Number((mean + 2 * std).toFixed(2)));
      lowerBand.push(Number((mean - 2 * std).toFixed(2)));
    }
  }

  createOrUpdateChart('chartTech10', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '실제 매출',
          data: series,
          borderColor: '#ffffff',
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: '상단 밴드 (+2σ)',
          data: upperBand,
          borderColor: 'rgba(239, 68, 68, 0.7)',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 0
        },
        {
          label: '중심선 (12MA)',
          data: ma,
          borderColor: COLORS.hanbit,
          borderWidth: 1.8,
          pointRadius: 0
        },
        {
          label: '하단 밴드 (-2σ)',
          data: lowerBand,
          borderColor: 'rgba(16, 185, 129, 0.7)',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 11] 기업 간 피어슨 상관관계 및 산점도 행렬 (Correlation Matrix)
// -------------------------------------------------------------
function renderTech11() {
  const corr = window.DATASET.metrics.corr;
  
  createOrUpdateChart('chartTech11', {
    type: 'bar',
    data: {
      labels: ['한빛테크 ↔ 미래솔루션', '한빛테크 ↔ 새봄산업', '미래솔루션 ↔ 새봄산업'],
      datasets: [
        {
          label: '피어슨 상관계수 (r)',
          data: [corr.hanbit_mirae, corr.hanbit_saebom, corr.mirae_saebom],
          backgroundColor: [
            corr.hanbit_mirae >= 0 ? '#38bdf8' : '#f43f5e',
            corr.hanbit_saebom >= 0 ? '#38bdf8' : '#f43f5e',
            corr.mirae_saebom >= 0 ? '#38bdf8' : '#f43f5e'
          ],
          borderRadius: 4
        }
      ]
    },
    options: {
      scales: {
        y: {
          min: -1,
          max: 1,
          title: { display: true, text: '상관계수 (-1.0 ~ +1.0)' },
          grid: {
            color: (ctx) => (ctx.tick.value === 0 ? '#ffffff' : (currentTheme === 'light' ? COLORS.gridLight : COLORS.gridDark))
          }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 12] 시장 점유율 전이 및 100% 누적 비중 (Market Share Evolution)
// -------------------------------------------------------------
function renderTech12() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);

  const shareHanbit = raw.map(d => {
    const tot = d.hanbit + d.mirae + d.saebom;
    return Number((d.hanbit / tot * 100).toFixed(1));
  });
  const shareMirae = raw.map(d => {
    const tot = d.hanbit + d.mirae + d.saebom;
    return Number((d.mirae / tot * 100).toFixed(1));
  });
  const shareSaebom = raw.map(d => {
    const tot = d.hanbit + d.mirae + d.saebom;
    return Number((d.saebom / tot * 100).toFixed(1));
  });

  createOrUpdateChart('chartTech12', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛테크 점유율 (%)',
          data: shareHanbit,
          backgroundColor: 'rgba(56, 189, 248, 0.7)',
          borderColor: COLORS.hanbit,
          fill: 'origin',
          pointRadius: 0
        },
        {
          label: '미래솔루션 점유율 (%)',
          data: shareMirae,
          backgroundColor: 'rgba(52, 211, 153, 0.7)',
          borderColor: COLORS.mirae,
          fill: '-1',
          pointRadius: 0
        },
        {
          label: '새봄산업 점유율 (%)',
          data: shareSaebom,
          backgroundColor: 'rgba(251, 191, 36, 0.7)',
          borderColor: COLORS.saebom,
          fill: '-1',
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: {
          stacked: true,
          min: 0,
          max: 100,
          title: { display: true, text: '합산 점유율 (%)' }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 13] 변동계수(CV) 기반 리스크-수익률 매트릭스
// -------------------------------------------------------------
function renderTech13() {
  const cagr = window.DATASET.metrics.cagr;
  const desc = window.DATASET.metrics.descriptive;

  createOrUpdateChart('chartTech13', {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: '한빛테크 (고성장-고변동성)',
          data: [{ x: desc.hanbit.cv, y: cagr.hanbit, r: 18 }],
          backgroundColor: 'rgba(56, 189, 248, 0.7)',
          borderColor: COLORS.hanbit
        },
        {
          label: '미래솔루션 (중성장-중변동성)',
          data: [{ x: desc.mirae.cv, y: cagr.mirae, r: 13 }],
          backgroundColor: 'rgba(52, 211, 153, 0.7)',
          borderColor: COLORS.mirae
        },
        {
          label: '새봄산업 (저성장-저변동성)',
          data: [{ x: desc.saebom.cv, y: cagr.saebom, r: 12 }],
          backgroundColor: 'rgba(251, 191, 36, 0.7)',
          borderColor: COLORS.saebom
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: '변동계수 CV (%) → 비즈니스 위험도' },
          min: 5,
          max: 28
        },
        y: {
          title: { display: true, text: '5개년 CAGR (%) → 성장 수익률' },
          min: -5,
          max: 20
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 14] 누적 매출 궤적 및 도달 속도 (Cumulative Revenue)
// -------------------------------------------------------------
function renderTech14() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);

  let cumH = 0, cumM = 0, cumS = 0;
  const arrH = [], arrM = [], arrS = [];

  raw.forEach(d => {
    cumH += d.hanbit;
    cumM += d.mirae;
    cumS += d.saebom;
    arrH.push(Number(cumH.toFixed(1)));
    arrM.push(Number(cumM.toFixed(1)));
    arrS.push(Number(cumS.toFixed(1)));
  });

  createOrUpdateChart('chartTech14', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛테크 누적 (총 753.6억)',
          data: arrH,
          borderColor: COLORS.hanbit,
          backgroundColor: COLORS.hanbitGlow,
          fill: true,
          borderWidth: 2.5,
          pointRadius: 0
        },
        {
          label: '새봄산업 누적 (총 543.6억)',
          data: arrS,
          borderColor: COLORS.saebom,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: '미래솔루션 누적 (총 510.3억)',
          data: arrM,
          borderColor: COLORS.mirae,
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '누적 매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 15] 매출 분포 밀도 및 구간 히스토그램 (Distribution Density)
// -------------------------------------------------------------
function renderTech15() {
  const raw = window.DATASET.monthly;
  const bins = ['6-8억', '8-10억', '10-12억', '12-14억', '14-16억', '16-18억+'];

  function getHist(key) {
    const counts = [0, 0, 0, 0, 0, 0];
    raw.forEach(d => {
      const v = d[key];
      if (v < 8) counts[0]++;
      else if (v < 10) counts[1]++;
      else if (v < 12) counts[2]++;
      else if (v < 14) counts[3]++;
      else if (v < 16) counts[4]++;
      else counts[5]++;
    });
    return counts;
  }

  createOrUpdateChart('chartTech15', {
    type: 'bar',
    data: {
      labels: bins,
      datasets: [
        {
          label: '한빛테크 빈도수(월)',
          data: getHist('hanbit'),
          backgroundColor: COLORS.hanbit,
          borderRadius: 4
        },
        {
          label: '미래솔루션 빈도수(월)',
          data: getHist('mirae'),
          backgroundColor: COLORS.mirae,
          borderRadius: 4
        },
        {
          label: '새봄산업 빈도수(월)',
          data: getHist('saebom'),
          backgroundColor: COLORS.saebom,
          borderRadius: 4
        }
      ]
    },
    options: {
      scales: {
        y: { title: { display: true, text: '월수 (개월)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 16] 분기별 실적(QoQ) 및 순환 주기 분석 (Quarterly Cycle)
// -------------------------------------------------------------
function renderTech16() {
  const raw = window.DATASET.monthly;
  const quarters = [];
  const qH = [], qM = [], qS = [];

  for (let i = 0; i < raw.length; i += 3) {
    const chunk = raw.slice(i, i + 3);
    const y = chunk[0].month.split('-')[0];
    const qNum = Math.floor(parseInt(chunk[0].month.split('-')[1]) / 3) + 1;
    quarters.push(`${y} ${qNum}Q`);
    
    qH.push(Number(chunk.reduce((a, b) => a + b.hanbit, 0).toFixed(2)));
    qM.push(Number(chunk.reduce((a, b) => a + b.mirae, 0).toFixed(2)));
    qS.push(Number(chunk.reduce((a, b) => a + b.saebom, 0).toFixed(2)));
  }

  createOrUpdateChart('chartTech16', {
    type: 'bar',
    data: {
      labels: quarters,
      datasets: [
        {
          label: '한빛테크',
          data: qH,
          backgroundColor: COLORS.hanbit,
          borderRadius: 3
        },
        {
          label: '미래솔루션',
          data: qM,
          backgroundColor: COLORS.mirae,
          borderRadius: 3
        },
        {
          label: '새봄산업',
          data: qS,
          backgroundColor: COLORS.saebom,
          borderRadius: 3
        }
      ]
    },
    options: {
      scales: {
        x: { ticks: { maxTicksLimit: 10 } },
        y: { title: { display: true, text: '분기 매출 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 17] 기준점(2021.01=100) 지수화 상대 수익률 (Base-Indexed)
// -------------------------------------------------------------
function renderTech17() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);
  const baseH = raw[0].hanbit;
  const baseM = raw[0].mirae;
  const baseS = raw[0].saebom;

  const idxH = raw.map(d => Number((d.hanbit / baseH * 100).toFixed(1)));
  const idxM = raw.map(d => Number((d.mirae / baseM * 100).toFixed(1)));
  const idxS = raw.map(d => Number((d.saebom / baseS * 100).toFixed(1)));

  createOrUpdateChart('chartTech17', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛테크 지수 (100 → 205.0)',
          data: idxH,
          borderColor: COLORS.hanbit,
          borderWidth: 2.2,
          pointRadius: 0
        },
        {
          label: '미래솔루션 지수 (100 → 166.2)',
          data: idxM,
          borderColor: COLORS.mirae,
          borderWidth: 2.2,
          pointRadius: 0
        },
        {
          label: '새봄산업 지수 (100 → 100.0)',
          data: idxS,
          borderColor: COLORS.saebom,
          borderWidth: 2.2,
          pointRadius: 0
        }
      ]
    },
    options: {
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: {
          title: { display: true, text: '지수 (2021.01 = 100)' },
          grid: {
            color: (ctx) => (ctx.tick.value === 100 ? '#ffffff' : (currentTheme === 'light' ? COLORS.gridLight : COLORS.gridDark))
          }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 18] 기업 간 페어 스프레드 및 격차 추이 (Pairwise Spread)
// -------------------------------------------------------------
function renderTech18() {
  const raw = window.DATASET.monthly;
  const labels = raw.map(d => d.month);

  const spreadHanbitSaebom = raw.map(d => Number((d.hanbit - d.saebom).toFixed(2)));
  const spreadHanbitMirae = raw.map(d => Number((d.hanbit - d.mirae).toFixed(2)));

  createOrUpdateChart('chartTech18', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '한빛 - 새봄 스프레드 (격차)',
          data: spreadHanbitSaebom,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          fill: true,
          borderWidth: 2,
          pointRadius: 0
        },
        {
          label: '한빛 - 미래 스프레드 (격차)',
          data: spreadHanbitMirae,
          borderColor: '#a78bfa',
          borderWidth: 2,
          pointRadius: 0
        }
      ]
    },
    options: {
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: {
          title: { display: true, text: '매출 격차 (억원)' },
          grid: {
            color: (ctx) => (ctx.tick.value === 0 ? '#ef4444' : (currentTheme === 'light' ? COLORS.gridLight : COLORS.gridDark))
          }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 19] 향후 12개월 단기 시계열 예측 (2026 Forecast)
// -------------------------------------------------------------
function renderTech19() {
  const raw = window.DATASET.monthly;
  const fcast = window.DATASET.metrics.forecast_2026;

  // 2024~2025 실적 + 2026 예측 결합
  const combinedLabels = raw.slice(-24).map(d => d.month).concat(fcast.map(f => f.month));

  const actualHanbit = raw.slice(-24).map(d => d.hanbit).concat(Array(12).fill(null));
  const forecastHanbit = Array(23).fill(null)
    .concat([raw[raw.length - 1].hanbit])
    .concat(fcast.map(f => f.hanbit));

  const forecastMirae = Array(23).fill(null)
    .concat([raw[raw.length - 1].mirae])
    .concat(fcast.map(f => f.mirae));

  const forecastSaebom = Array(23).fill(null)
    .concat([raw[raw.length - 1].saebom])
    .concat(fcast.map(f => f.saebom));

  createOrUpdateChart('chartTech19', {
    type: 'line',
    data: {
      labels: combinedLabels,
      datasets: [
        {
          label: '한빛 실적치 (2024~2025)',
          data: actualHanbit,
          borderColor: COLORS.hanbit,
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: '한빛 2026 예측치 (가법 시계열 모델)',
          data: forecastHanbit,
          borderColor: COLORS.hanbit,
          borderDash: [6, 4],
          borderWidth: 2.5,
          pointRadius: 3
        },
        {
          label: '미래 2026 예측치',
          data: forecastMirae,
          borderColor: COLORS.mirae,
          borderDash: [6, 4],
          borderWidth: 2,
          pointRadius: 2
        },
        {
          label: '새봄 2026 예측치',
          data: forecastSaebom,
          borderColor: COLORS.saebom,
          borderDash: [6, 4],
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    },
    options: {
      scales: {
        x: { ticks: { maxTicksLimit: 12 } },
        y: { title: { display: true, text: '매출액 (억원)' } }
      }
    }
  });
}

// -------------------------------------------------------------
// [기법 20] 시장 집중도(HHI) 및 포트폴리오 다각화 효과
// -------------------------------------------------------------
function renderTech20() {
  const ann = window.DATASET.metrics.annual;
  const years = Object.keys(ann);

  const hhiValues = years.map(y => {
    const tot = ann[y].total;
    const sH = (ann[y].hanbit / tot) * 100;
    const sM = (ann[y].mirae / tot) * 100;
    const sS = (ann[y].saebom / tot) * 100;
    return Number((sH * sH + sM * sM + sS * sS).toFixed(1));
  });

  createOrUpdateChart('chartTech20', {
    type: 'line',
    data: {
      labels: years.map(y => `${y}년`),
      datasets: [
        {
          label: '허핀달-허쉬만 시장 집중도 지수 (HHI)',
          data: hhiValues,
          borderColor: '#a78bfa',
          backgroundColor: 'rgba(167, 139, 250, 0.2)',
          fill: true,
          borderWidth: 2.5,
          pointRadius: 5
        }
      ]
    },
    options: {
      scales: {
        y: {
          min: 3000,
          max: 4000,
          title: { display: true, text: 'HHI 지수 (2500 이상: 고집중 과점)' }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// 이벤트 리스너 및 탭 제어
// -------------------------------------------------------------
function initEventListeners() {
  // 테마 토글 버튼
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      themeBtn.innerHTML = currentTheme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
      // 모든 차트 다시 렌더링하여 테마 색상 반영
      initAllTechniques();
    });
  }

  // 카테고리 탭 클릭
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      filterTechniqueCards(activeCategory);
    });
  });

  // 데이터 다운로드 버튼 (JSON)
  const exportBtn = document.getElementById('exportJsonBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(window.DATASET, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'sales_analysis_data.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }
}

function filterTechniqueCards(cat) {
  const cards = document.querySelectorAll('.technique-card');
  const banners = document.querySelectorAll('.category-banner-item');
  
  if (cat === 'all') {
    cards.forEach(c => c.style.display = 'block');
    banners.forEach(b => b.style.display = 'block');
    return;
  }

  cards.forEach(c => {
    if (c.getAttribute('data-category') === cat) {
      c.style.display = 'block';
    } else {
      c.style.display = 'none';
    }
  });

  banners.forEach(b => {
    if (b.getAttribute('data-cat') === cat) {
      b.style.display = 'block';
    } else {
      b.style.display = 'none';
    }
  });
}
