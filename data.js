// 5개년 3개 기업(한빛테크, 미래솔루션, 새봄산업) 60개월 매출 데이터셋
// 기간: 2021년 01월 ~ 2025년 12월 (단위: 억원)
// 외부 전송 없이 브라우저 로컬 메모리에서 100% 처리됩니다.

const RAW_MONTHLY_DATA = [
  {
    "month": "2021-01",
    "hanbit": 8.59,
    "mirae": 7.1,
    "saebom": 10.15
  },
  {
    "month": "2021-02",
    "hanbit": 9.08,
    "mirae": 7.79,
    "saebom": 10.32
  },
  {
    "month": "2021-03",
    "hanbit": 10.22,
    "mirae": 7.44,
    "saebom": 9.75
  },
  {
    "month": "2021-04",
    "hanbit": 9.83,
    "mirae": 7.35,
    "saebom": 9.32
  },
  {
    "month": "2021-05",
    "hanbit": 9.77,
    "mirae": 7.02,
    "saebom": 8.94
  },
  {
    "month": "2021-06",
    "hanbit": 9.78,
    "mirae": 6.66,
    "saebom": 8.55
  },
  {
    "month": "2021-07",
    "hanbit": 9.36,
    "mirae": 6.22,
    "saebom": 8.56
  },
  {
    "month": "2021-08",
    "hanbit": 8.64,
    "mirae": 6.23,
    "saebom": 8.25
  },
  {
    "month": "2021-09",
    "hanbit": 8.35,
    "mirae": 6.28,
    "saebom": 8.52
  },
  {
    "month": "2021-10",
    "hanbit": 7.69,
    "mirae": 6.82,
    "saebom": 9.34
  },
  {
    "month": "2021-11",
    "hanbit": 9.47,
    "mirae": 8.07,
    "saebom": 10.89
  },
  {
    "month": "2021-12",
    "hanbit": 10.36,
    "mirae": 8.41,
    "saebom": 11.25
  },
  {
    "month": "2022-01",
    "hanbit": 10.07,
    "mirae": 8.11,
    "saebom": 10.39
  },
  {
    "month": "2022-02",
    "hanbit": 10.79,
    "mirae": 8.45,
    "saebom": 9.58
  },
  {
    "month": "2022-03",
    "hanbit": 11.19,
    "mirae": 8.22,
    "saebom": 9.25
  },
  {
    "month": "2022-04",
    "hanbit": 11.54,
    "mirae": 7.92,
    "saebom": 8.93
  },
  {
    "month": "2022-05",
    "hanbit": 11.84,
    "mirae": 7.74,
    "saebom": 8.54
  },
  {
    "month": "2022-06",
    "hanbit": 10.98,
    "mirae": 7.27,
    "saebom": 8.58
  },
  {
    "month": "2022-07",
    "hanbit": 10.66,
    "mirae": 7.11,
    "saebom": 7.95
  },
  {
    "month": "2022-08",
    "hanbit": 9.99,
    "mirae": 6.68,
    "saebom": 8.2
  },
  {
    "month": "2022-09",
    "hanbit": 9.66,
    "mirae": 6.99,
    "saebom": 8.64
  },
  {
    "month": "2022-10",
    "hanbit": 9.31,
    "mirae": 7.41,
    "saebom": 9.24
  },
  {
    "month": "2022-11",
    "hanbit": 10.43,
    "mirae": 8.3,
    "saebom": 10.45
  },
  {
    "month": "2022-12",
    "hanbit": 11.31,
    "mirae": 9.02,
    "saebom": 11.33
  },
  {
    "month": "2023-01",
    "hanbit": 11.66,
    "mirae": 8.6,
    "saebom": 9.98
  },
  {
    "month": "2023-02",
    "hanbit": 12.27,
    "mirae": 9.34,
    "saebom": 9.67
  },
  {
    "month": "2023-03",
    "hanbit": 12.95,
    "mirae": 8.91,
    "saebom": 9.39
  },
  {
    "month": "2023-04",
    "hanbit": 13.35,
    "mirae": 8.96,
    "saebom": 9.16
  },
  {
    "month": "2023-05",
    "hanbit": 13.41,
    "mirae": 8.32,
    "saebom": 8.76
  },
  {
    "month": "2023-06",
    "hanbit": 12.98,
    "mirae": 7.79,
    "saebom": 7.8
  },
  {
    "month": "2023-07",
    "hanbit": 11.78,
    "mirae": 7.74,
    "saebom": 8.15
  },
  {
    "month": "2023-08",
    "hanbit": 11.25,
    "mirae": 7.2,
    "saebom": 8.01
  },
  {
    "month": "2023-09",
    "hanbit": 11.15,
    "mirae": 7.54,
    "saebom": 8.71
  },
  {
    "month": "2023-10",
    "hanbit": 10.89,
    "mirae": 7.54,
    "saebom": 8.98
  },
  {
    "month": "2023-11",
    "hanbit": 12.48,
    "mirae": 9.4,
    "saebom": 10.16
  },
  {
    "month": "2023-12",
    "hanbit": 13.45,
    "mirae": 9.73,
    "saebom": 10.62
  },
  {
    "month": "2024-01",
    "hanbit": 13.01,
    "mirae": 9.84,
    "saebom": 9.91
  },
  {
    "month": "2024-02",
    "hanbit": 14.0,
    "mirae": 9.83,
    "saebom": 9.23
  },
  {
    "month": "2024-03",
    "hanbit": 15.73,
    "mirae": 10.18,
    "saebom": 8.98
  },
  {
    "month": "2024-04",
    "hanbit": 15.88,
    "mirae": 9.76,
    "saebom": 8.43
  },
  {
    "month": "2024-05",
    "hanbit": 15.92,
    "mirae": 9.28,
    "saebom": 8.4
  },
  {
    "month": "2024-06",
    "hanbit": 15.01,
    "mirae": 8.41,
    "saebom": 7.79
  },
  {
    "month": "2024-07",
    "hanbit": 13.49,
    "mirae": 8.62,
    "saebom": 8.01
  },
  {
    "month": "2024-08",
    "hanbit": 13.41,
    "mirae": 7.99,
    "saebom": 7.61
  },
  {
    "month": "2024-09",
    "hanbit": 12.75,
    "mirae": 8.47,
    "saebom": 7.93
  },
  {
    "month": "2024-10",
    "hanbit": 12.2,
    "mirae": 8.24,
    "saebom": 8.79
  },
  {
    "month": "2024-11",
    "hanbit": 14.5,
    "mirae": 9.89,
    "saebom": 10.09
  },
  {
    "month": "2024-12",
    "hanbit": 15.4,
    "mirae": 10.71,
    "saebom": 10.74
  },
  {
    "month": "2025-01",
    "hanbit": 14.98,
    "mirae": 10.08,
    "saebom": 9.42
  },
  {
    "month": "2025-02",
    "hanbit": 16.77,
    "mirae": 10.43,
    "saebom": 9.11
  },
  {
    "month": "2025-03",
    "hanbit": 18.27,
    "mirae": 10.88,
    "saebom": 8.86
  },
  {
    "month": "2025-04",
    "hanbit": 18.14,
    "mirae": 10.2,
    "saebom": 8.28
  },
  {
    "month": "2025-05",
    "hanbit": 17.76,
    "mirae": 10.13,
    "saebom": 7.85
  },
  {
    "month": "2025-06",
    "hanbit": 16.89,
    "mirae": 9.19,
    "saebom": 7.79
  },
  {
    "month": "2025-07",
    "hanbit": 15.84,
    "mirae": 9.35,
    "saebom": 7.81
  },
  {
    "month": "2025-08",
    "hanbit": 14.55,
    "mirae": 8.63,
    "saebom": 7.81
  },
  {
    "month": "2025-09",
    "hanbit": 13.95,
    "mirae": 8.63,
    "saebom": 8.28
  },
  {
    "month": "2025-10",
    "hanbit": 14.17,
    "mirae": 9.25,
    "saebom": 8.6
  },
  {
    "month": "2025-11",
    "hanbit": 16.78,
    "mirae": 10.8,
    "saebom": 9.55
  },
  {
    "month": "2025-12",
    "hanbit": 17.61,
    "mirae": 11.8,
    "saebom": 10.15
  }
];

const SUMMARY_METRICS = {
  "descriptive": {
    "hanbit": {
      "mean": 12.56,
      "std": 2.76,
      "median": 12.23,
      "min": 7.69,
      "max": 18.27,
      "q25": 10.32,
      "q75": 14.51,
      "iqr": 4.19,
      "cv": 21.96
    },
    "mirae": {
      "mean": 8.5,
      "std": 1.3,
      "median": 8.41,
      "min": 6.22,
      "max": 11.8,
      "q25": 7.52,
      "q75": 9.36,
      "iqr": 1.85,
      "cv": 15.28
    },
    "saebom": {
      "mean": 9.06,
      "std": 0.96,
      "median": 8.93,
      "min": 7.61,
      "max": 11.33,
      "q25": 8.28,
      "q75": 9.69,
      "iqr": 1.41,
      "cv": 10.6
    }
  },
  "ols": {
    "hanbit": {
      "slope": 0.1394,
      "intercept": 8.45,
      "r2": 0.7799
    },
    "mirae": {
      "slope": 0.0567,
      "intercept": 6.83,
      "r2": 0.5802
    },
    "saebom": {
      "slope": -0.0159,
      "intercept": 9.53,
      "r2": 0.0832
    }
  },
  "cagr": {
    "hanbit": 15.2,
    "mirae": 8.74,
    "saebom": -2.35,
    "total": 7.76
  },
  "annual": {
    "2021": {
      "hanbit": 111.14,
      "mirae": 85.39,
      "saebom": 113.84,
      "total": 310.37
    },
    "2022": {
      "hanbit": 127.77,
      "mirae": 93.22,
      "saebom": 111.08,
      "total": 332.07
    },
    "2023": {
      "hanbit": 147.62,
      "mirae": 101.07,
      "saebom": 109.39,
      "total": 358.08
    },
    "2024": {
      "hanbit": 171.3,
      "mirae": 111.22,
      "saebom": 105.91,
      "total": 388.43
    },
    "2025": {
      "hanbit": 195.71,
      "mirae": 119.37,
      "saebom": 103.51,
      "total": 418.59
    }
  },
  "seasonality": {
    "1": {
      "hanbit_avg": 11.66,
      "mirae_avg": 8.75,
      "saebom_avg": 9.97
    },
    "2": {
      "hanbit_avg": 12.58,
      "mirae_avg": 9.17,
      "saebom_avg": 9.58
    },
    "3": {
      "hanbit_avg": 13.67,
      "mirae_avg": 9.13,
      "saebom_avg": 9.25
    },
    "4": {
      "hanbit_avg": 13.75,
      "mirae_avg": 8.84,
      "saebom_avg": 8.82
    },
    "5": {
      "hanbit_avg": 13.74,
      "mirae_avg": 8.5,
      "saebom_avg": 8.5
    },
    "6": {
      "hanbit_avg": 13.13,
      "mirae_avg": 7.86,
      "saebom_avg": 8.1
    },
    "7": {
      "hanbit_avg": 12.23,
      "mirae_avg": 7.81,
      "saebom_avg": 8.1
    },
    "8": {
      "hanbit_avg": 11.57,
      "mirae_avg": 7.35,
      "saebom_avg": 7.98
    },
    "9": {
      "hanbit_avg": 11.17,
      "mirae_avg": 7.58,
      "saebom_avg": 8.42
    },
    "10": {
      "hanbit_avg": 10.85,
      "mirae_avg": 7.85,
      "saebom_avg": 8.99
    },
    "11": {
      "hanbit_avg": 12.73,
      "mirae_avg": 9.29,
      "saebom_avg": 10.23
    },
    "12": {
      "hanbit_avg": 13.63,
      "mirae_avg": 9.93,
      "saebom_avg": 10.82
    }
  },
  "corr": {
    "hanbit_mirae": 0.871,
    "hanbit_saebom": -0.226,
    "mirae_saebom": 0.236
  },
  "hhi": {
    "2021": 3384.5,
    "2025": 3610.7
  },
  "forecast_2026": [
    {
      "month": "2026-01",
      "hanbit": 15.91,
      "mirae": 10.48,
      "saebom": 9.49,
      "total": 35.88
    },
    {
      "month": "2026-02",
      "hanbit": 16.97,
      "mirae": 10.96,
      "saebom": 9.08,
      "total": 37.01
    },
    {
      "month": "2026-03",
      "hanbit": 18.2,
      "mirae": 10.97,
      "saebom": 8.73,
      "total": 37.9
    },
    {
      "month": "2026-04",
      "hanbit": 18.42,
      "mirae": 10.74,
      "saebom": 8.29,
      "total": 37.45
    },
    {
      "month": "2026-05",
      "hanbit": 18.55,
      "mirae": 10.46,
      "saebom": 7.95,
      "total": 36.96
    },
    {
      "month": "2026-06",
      "hanbit": 18.08,
      "mirae": 9.87,
      "saebom": 7.54,
      "total": 35.49
    },
    {
      "month": "2026-07",
      "hanbit": 17.32,
      "mirae": 9.88,
      "saebom": 7.52,
      "total": 34.72
    },
    {
      "month": "2026-08",
      "hanbit": 16.8,
      "mirae": 9.48,
      "saebom": 7.38,
      "total": 33.66
    },
    {
      "month": "2026-09",
      "hanbit": 16.54,
      "mirae": 9.76,
      "saebom": 7.81,
      "total": 34.11
    },
    {
      "month": "2026-10",
      "hanbit": 16.36,
      "mirae": 10.09,
      "saebom": 8.36,
      "total": 34.81
    },
    {
      "month": "2026-11",
      "hanbit": 18.38,
      "mirae": 11.59,
      "saebom": 9.59,
      "total": 39.56
    },
    {
      "month": "2026-12",
      "hanbit": 19.42,
      "mirae": 12.28,
      "saebom": 10.16,
      "total": 41.86
    }
  ]
};

window.DATASET = {
  monthly: RAW_MONTHLY_DATA,
  metrics: SUMMARY_METRICS
};
