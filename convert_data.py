"""대학알리미 Excel 파일을 React 앱용 JSON으로 변환하는 예시 스크립트."""
import pandas as pd
import json
from pathlib import Path

# 프로젝트 및 파일 환경에 맞게 경로를 수정하세요.
SOURCE_2025 = Path("2025등록금.xlsx")
SOURCE_2026 = Path("2026등록금.xlsx")
OUTPUT = Path("public/data")

def load(path):
    df = pd.read_excel(path, header=3).dropna(subset=["학교"]).copy()
    df["기준연도"] = df["기준연도"].astype(int)
    df["학교"] = df["학교"].astype(str).str.strip()
    return df

# 실제 변환 규칙은 프로젝트 생성 시 포함된 public/data JSON 구조와
# src/types.ts의 TuitionRecord 인터페이스를 참고하세요.
print(load(SOURCE_2025).shape, load(SOURCE_2026).shape)
