# 임윤찬 x 도쿄 아트 투어 앱

일자별 탭으로 도쿄 아트 투어 일정, 숙소, 식당, 미술관 안내를 확인하는 React 앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더를 GitHub 원격 저장소에 연결합니다.

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

3. GitHub 저장소의 `Settings > Pages`에서 `Source`를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 push하면 `.github/workflows/deploy-pages.yml`이 자동으로 앱을 빌드하고 배포합니다.

## 수정 후 자동 배포 흐름

한 번 GitHub 원격 저장소가 연결된 뒤에는, 앱 내용을 수정하고 아래 명령을 실행하면 됩니다.

```bash
npm run publish
```

이 명령은 다음 순서로 처리합니다.

1. 테스트 실행
2. 배포 빌드 실행
3. 변경 파일 커밋
4. `main` 브랜치를 GitHub로 push
5. GitHub Actions가 자동으로 GitHub Pages 배포

배포 후 공개 주소는 GitHub Actions 실행 결과 또는 `Settings > Pages`에서 확인할 수 있습니다.
