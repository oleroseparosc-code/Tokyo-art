# 임윤찬 x 도쿄 아트 투어 앱

일자별 탭으로 도쿄 아트 투어 일정, 숙소, 식당, 미술관 안내를 확인하는 React 앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더를 Git 저장소로 만들고 GitHub 원격 저장소에 push합니다.
3. GitHub 저장소의 `Settings > Pages`에서 `Source`를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 자동으로 앱을 빌드하고 배포합니다.

배포 후 공개 주소는 GitHub Actions 실행 결과 또는 `Settings > Pages`에서 확인할 수 있습니다.
