import React, { useState } from "react";
import {
  AlertTriangle,
  Bus,
  ExternalLink,
  Globe,
  Hotel,
  Info,
  MapPin,
  Music,
  Palette,
  Plane,
  Route,
  Utensils,
} from "lucide-react";

const mapTo = (destination) =>
  `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(destination)}`;

const artDetails = {
  vanGogh: {
    points: [
      "크뢸러-뮐러 미술관 소장품을 중심으로 네덜란드 시기부터 아를 시기까지 색채가 밝아지는 변화를 따라봅니다.",
      "노란 카페 조명, 푸른 밤하늘, 별빛의 대비를 보며 반 고흐가 밤을 검정이 아닌 색으로 표현한 방식을 봅니다.",
    ],
    exhibition: {
      title: "대 반 고흐전: 밤의 카페 테라스",
      desc: "우에노모리 미술관에서 열리는 반 고흐 특별전. '밤의 카페 테라스'를 중심으로 크뢸러-뮐러 미술관 소장품을 만나는 일정입니다.",
      link: "https://grand-van-gogh-tokyo.com/",
    },
    works: [
      {
        title: "밤의 카페 테라스",
        artist: "빈센트 반 고흐",
        workLink:
          "https://krollermuller.nl/en/vincent-van-gogh-terrace-of-a-cafe-at-night-place-du-forum",
        artistLink:
          "https://ko.wikipedia.org/wiki/%EB%B9%88%EC%84%BC%ED%8A%B8_%EB%B0%98_%EA%B3%A0%ED%9D%90",
        summary:
          "1888년 아를의 밤 풍경을 강렬한 노랑과 파랑으로 그린 작품입니다. 어둠 속에서도 색이 살아나는 반 고흐 특유의 감각을 보기 좋습니다.",
      },
    ],
  },
  nmwa: {
    points: [
      "호쿠사이의 후지산 연작을 먼저 보고, 상설전에서 모네와 로댕으로 이어지는 서양미술 흐름을 연결해 봅니다.",
      "르 코르뷔지에가 설계한 세계문화유산 건물의 동선, 자연광, 중정 구조도 함께 관찰합니다.",
    ],
    exhibition: {
      title: "호쿠사이: 후지산 36경 - 이우치 컬렉션",
      desc: "'가나가와 해변의 높은 파도 아래'가 포함된 호쿠사이 대표 연작과 국립서양미술관 상설 컬렉션을 함께 볼 수 있습니다.",
      link: "https://www.nmwa.go.jp/en/exhibitions/2026hokusai.html",
    },
    works: [
      {
        title: "가나가와 해변의 높은 파도 아래",
        artist: "가쓰시카 호쿠사이",
        workLink: "https://www.metmuseum.org/art/collection/search/45434",
        artistLink:
          "https://ko.wikipedia.org/wiki/%EA%B0%80%EC%B8%A0%EC%8B%9C%EC%B9%B4_%ED%98%B8%EC%BF%A0%EC%82%AC%EC%9D%B4",
        summary:
          "거대한 파도와 작은 후지산을 대비시킨 우키요에 대표작입니다. 일본 목판화가 서구 인상주의에 준 영향을 떠올리며 보기 좋습니다.",
      },
      {
        title: "수련",
        artist: "클로드 모네",
        workLink: "https://collection.nmwa.go.jp/en/P.1959-0159.html",
        artistLink:
          "https://ko.wikipedia.org/wiki/%ED%81%B4%EB%A1%9C%EB%93%9C_%EB%AA%A8%EB%84%A4",
        summary:
          "마쓰카타 컬렉션의 핵심 작품 중 하나입니다. 가까이서 붓질을 보고, 멀리서 물과 빛의 인상이 합쳐지는 감각을 비교해보세요.",
      },
    ],
  },
  tobikan: {
    points: [
      "와이어스가 반복해서 다룬 창문, 문턱, 들판 같은 경계 이미지를 따라가며 감상합니다.",
      "정교한 사실 묘사와 고독한 분위기가 함께 만드는 심리적 긴장감에 집중합니다.",
    ],
    exhibition: {
      title: "앤드루 와이어스: Boundaries or Windows",
      desc: "도쿄도미술관 개관 100주년 기념전. 20세기 미국 구상회화를 대표하는 와이어스를 '경계'라는 주제로 해석합니다.",
      link: "https://www.tobikan.jp/en/exhibition/2026_wyeth.html",
    },
    works: [
      {
        title: "Christina's World",
        artist: "앤드루 와이어스",
        workLink: "https://www.moma.org/collection/works/78455",
        artistLink:
          "https://ko.wikipedia.org/wiki/%EC%95%A4%EB%93%9C%EB%A3%A8_%EC%99%80%EC%9D%B4%EC%96%B4%EC%8A%A4",
        summary:
          "들판과 인물 사이의 거리감으로 욕망, 고독, 긴장을 압축한 와이어스의 대표작입니다. 전시장에서는 같은 정서가 어떻게 반복되는지 살펴보세요.",
      },
    ],
  },
  picasso: {
    points: [
      "폴 스미스의 색채와 공간 연출이 피카소 작품을 어떻게 다르게 읽게 만드는지 봅니다.",
      "입체주의적 분해, 장난기, 인물 변형이 회화와 조각, 도자에서 어떻게 달라지는지 비교합니다.",
    ],
    exhibition: {
      title: "Picasso, through the Eyes of Paul Smith",
      desc: "국립신미술관에서 열리는 피카소 특별전. 파리 피카소 미술관 소장품을 폴 스미스의 시선으로 재구성한 전시입니다.",
      link: "https://www.nact.jp/english/exhibition_special/2026/picasso_paulsmith/",
    },
    works: [
      {
        title: "아비뇽의 처녀들",
        artist: "파블로 피카소",
        workLink: "https://www.moma.org/collection/works/79766",
        artistLink:
          "https://ko.wikipedia.org/wiki/%ED%8C%8C%EB%B8%94%EB%A1%9C_%ED%94%BC%EC%B9%B4%EC%86%8C",
        summary:
          "입체주의의 출발점으로 자주 언급되는 작품입니다. 인체를 한 시점이 아닌 여러 각도와 면으로 해체한 피카소의 급진성을 보여줍니다.",
      },
    ],
  },
  hakone: {
    points: [
      "야외 조각은 산 풍경, 빛, 이동 동선에 따라 인상이 달라지므로 작품 주위를 천천히 걸어봅니다.",
      "피카소관의 도자, 회화, 태피스트리와 헨리 무어 조각을 비교하며 재료별 표현 차이를 봅니다.",
    ],
    exhibition: {
      title: "피카소관 및 야외 상설 조각 컬렉션",
      desc: "하코네 오픈에어 뮤지엄의 핵심은 자연 속 조각 산책과 피카소관입니다. 폴라 미술관 휴무 기간의 주요 대체 일정입니다.",
      link: "https://www.hakone-oam.or.jp/en/permanentexhibits/",
    },
    works: [
      {
        title: "Reclining Figure 계열",
        artist: "헨리 무어",
        workLink:
          "https://www.hakone-oam.or.jp/en/permanentexhibits/henrymoorecollection",
        artistLink:
          "https://ko.wikipedia.org/wiki/%ED%97%A8%EB%A6%AC_%EB%AC%B4%EC%96%B4",
        summary:
          "인체를 풍경처럼 단순화한 무어의 대표 조각군입니다. 자연 속에 놓인 형태와 빈 공간의 균형을 체감하기 좋습니다.",
      },
      {
        title: "피카소 도자 컬렉션",
        artist: "파블로 피카소",
        workLink:
          "https://www.hakone-oam.or.jp/en/permanent/pablopicassocollection",
        artistLink:
          "https://ko.wikipedia.org/wiki/%ED%8C%8C%EB%B8%94%EB%A1%9C_%ED%94%BC%EC%B9%B4%EC%86%8C",
        summary:
          "회화적 선과 입체적 표면이 만나는 피카소의 도자 작품을 볼 수 있습니다. 장난기와 형태 변형을 함께 보세요.",
      },
    ],
  },
  senju: {
    points: [
      "니시자와 류에의 건축 안에서 작품, 유리벽, 정원이 이어지는 방식을 함께 봅니다.",
      "폭포 그림의 여백, 흘러내리는 안료, 빛의 반사가 실제 물소리처럼 느껴지는 순간에 집중합니다.",
    ],
    exhibition: {
      title: "히로시 센주 컬렉션: Waterfall",
      desc: "가루이자와의 자연 속에서 센주의 대표 폭포 연작을 만나는 미술관입니다.",
      link: "https://www.senju-museum.jp/en/exhibition/",
    },
    works: [
      {
        title: "Waterfall",
        artist: "히로시 센주",
        workLink: "https://www.senju-museum.jp/en/exhibition/",
        artistLink: "https://en.wikipedia.org/wiki/Hiroshi_Senju",
        summary:
          "일본화 재료로 폭포의 낙하와 안개를 표현한 대표 연작입니다. 자연의 재현보다 명상적인 공간감을 느끼는 데 초점을 두면 좋습니다.",
      },
    ],
  },
  haraArc: {
    points: [
      "시부카와의 넓은 풍경 속 현대미술관이라, 전시장과 야외 공간의 거리감 자체가 감상 포인트입니다.",
      "현대미술 컬렉션과 관해정의 동아시아 고미술을 함께 보며 시대와 매체가 바뀔 때 감상 리듬이 어떻게 달라지는지 봅니다.",
    ],
    exhibition: {
      title: "하라뮤지엄 ARC 컬렉션",
      desc: "군마현 시부카와의 하라뮤지엄 ARC는 현대미술 컬렉션과 관해정 전시 공간을 함께 운영하는 미술관입니다.",
      link: "https://www.haramuseum.or.jp/en/arc/",
    },
    works: [
      {
        title: "Campbell's Soup Cans",
        artist: "앤디 워홀",
        workLink: "https://www.moma.org/collection/works/79809",
        artistLink:
          "https://ko.wikipedia.org/wiki/%EC%95%A4%EB%94%94_%EC%9B%8C%ED%99%80",
        summary:
          "대중 소비 이미지를 예술의 전면에 올린 팝아트 대표작입니다. 하라뮤지엄 ARC에서는 현대미술 컬렉션을 읽는 기준점으로 삼기 좋습니다.",
      },
      {
        title: "Infinity Mirror Room 계열",
        artist: "구사마 야요이",
        workLink:
          "https://www.tate.org.uk/art/artworks/kusama-infinity-mirrored-room-filled-with-the-brilliance-of-life-t13733",
        artistLink:
          "https://ko.wikipedia.org/wiki/%EA%B5%AC%EC%82%AC%EB%A7%88_%EC%95%BC%EC%9A%94%EC%9D%B4",
        summary:
          "반복, 점, 거울 공간으로 무한감을 만드는 구사마의 대표적 작업 계열입니다. 현대미술의 몰입형 감각을 이해하는 데 도움이 됩니다.",
      },
    ],
  },
};

const restaurants = [
  {
    name: "국립서양미술관 1층 레스토랑 Cafe Suiren",
    menu: "르 꼬르비쥐에 세트",
    desc: "국립서양미술관 관람 전후 가장 동선이 짧은 식사 후보입니다.",
    mapLink: mapTo("Cafe Suiren National Museum of Western Art Tokyo"),
    siteLink: "https://www.nmwa.go.jp/en/visit/shop.html",
  },
  {
    name: "도쿄도미술관 2층 레스토랑",
    menu: "오므라이스",
    desc: "도쿄도미술관 추가 관람 루트와 잘 맞는 식사 후보입니다.",
    mapLink: mapTo("Tokyo Metropolitan Art Museum restaurant"),
    siteLink: "https://www.tobikan.jp/en/guide/restaurant.html",
  },
  {
    name: "우에노역 근처 스시/초밥",
    menu: "스시 또는 초밥 정식",
    desc: "특정 가게를 고정하지 않고 현장 상황과 대기열에 맞춰 선택하는 후보입니다.",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Ueno+Station+sushi",
    siteLink:
      "https://www.google.com/maps/search/?api=1&query=Ueno+Station+sushi",
  },
  {
    name: "우에노역 근처 이치란 라멘",
    menu: "돈코츠 라멘",
    desc: "혼밥과 빠른 식사에 유리한 후보입니다. 대기 시간이 길면 다른 후보로 전환하세요.",
    mapLink: mapTo("Ichiran Ueno"),
    siteLink: "https://en.ichiran.com/shop/tokyo/ueno/",
  },
  {
    name: "국립서양미술관-도쿄도미술관 사이 스타벅스",
    menu: "커피, 샌드위치, 간단한 디저트",
    desc: "전시 사이 휴식과 집결 전 시간 조절에 좋은 후보입니다.",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Starbucks+Ueno+Park",
    siteLink: "https://www.starbucks.co.jp/",
  },
];

const confirmedMeals = {
  d2Lunch: {
    name: "츠유샤브 치리리 시나가와점",
    menu: "샤브샤브런치",
    desc: "확정서 기준 2일차 중식 장소입니다. 시나가와역 인근의 츠유샤브 전문점입니다.",
    mapLink: mapTo("Tsuyu Shabu Chiriri Shinagawa"),
    siteLink: "https://www.tablecheck.com/en/chiriri-shinagawa",
  },
  d2Dinner: {
    name: "스스키노하라 이치노유",
    menu: "샤브샤브카이세키",
    desc: "확정서 기준 2일차 숙소 석식입니다.",
    mapLink: mapTo("Susukinohara Ichinoyu Hakone"),
    siteLink: "https://www.ichinoyu.co.jp/facilities/susuki/",
  },
  d3Lunch: {
    name: "하코네엔",
    menu: "일정식(후지고젠)",
    desc: "확정서 기준 3일차 중식 장소입니다.",
    mapLink: mapTo("Hakone-en"),
    siteLink:
      "https://www.princehotels.co.jp/amuse/hakone-en/restaurant/pdf/group_lunch01.pdf",
  },
  d3Dinner: {
    name: "호텔 인디고 가루이자와",
    menu: "호텔식 석식",
    desc: "확정서 기준 3일차 숙소 석식입니다.",
    mapLink: mapTo("Hotel Indigo Karuizawa"),
    siteLink:
      "https://www.ihg.com/hotelindigo/hotels/us/en/karuizawa/qngka/hoteldetail",
  },
  d4Lunch: {
    name: "로구테이 본점",
    menu: "야키니쿠정식",
    desc: "확정서 기준 4일차 중식 장소입니다.",
    mapLink: mapTo("Rogutei Honten Karuizawa"),
    siteLink: "https://logtei.jp/",
  },
};

const dayOneRoutes = [
  {
    name: "반 고흐 집중 루트",
    flow: "나리타 도착 → 우에노모리 미술관 → 주변 식사 → 18:00 재집결 → 산토리홀",
    bestFor: "전시를 천천히 보고 싶거나 항공 지연이 있는 경우",
    note: "가장 안정적인 루트입니다. 점심/저녁은 현장 상황에 맞춰 우에노역 후보 중 선택합니다.",
  },
  {
    name: "국립서양미술관 추가 루트",
    flow: "우에노모리 미술관 → 국립서양미술관 → Cafe Suiren 식사 → 18:00 재집결",
    bestFor: "호쿠사이, 모네, 로댕, 건축까지 함께 보고 싶은 경우",
    note: "두 미술관이 가까워 도보 이동 부담이 낮습니다. 관람 시간이 부족하면 상설전 일부만 봅니다.",
    art: artDetails.nmwa,
  },
  {
    name: "도쿄도미술관 추가 루트",
    flow: "우에노모리 미술관 → 도쿄도미술관 → 2층 레스토랑 오므라이스 → 18:00 재집결",
    bestFor: "앤드루 와이어스 특별전을 우선하고 싶은 경우",
    note: "도쿄도미술관도 우에노 공원 안에 있어 현장 예매 후 유연하게 보기 좋습니다.",
    art: artDetails.tobikan,
  },
  {
    name: "식사 우선 루트",
    flow: "우에노모리 미술관 짧게 관람 → 우에노역 스시/이치란/스타벅스 → 공원 산책 → 18:00 재집결",
    bestFor: "도착 후 체력 회복과 식사를 먼저 하고 싶은 경우",
    note: "1일차 점심과 저녁은 불포함이므로, 현장 대기열과 공연 시간을 기준으로 빠르게 결정합니다.",
  },
];

const itinerary = {
  1: [
    {
      id: "d1-flight",
      type: "flight",
      time: "09:45 - 12:15",
      title: "인천(ICN) → 나리타(NRT)",
      desc: "제주항공 7C1175편. 11JUN26(목) 09:45 → 12:15, 서울 ICN 터미널 1 출발 → 도쿄 NRT 터미널 3 도착. 예약번호 H6BDFY, JEJU AIR 운항. 항공 지연 가능성을 고려해 1일차 점심과 저녁은 자유식으로 운영합니다.",
      mapLink: mapTo("Narita International Airport"),
    },
    {
      id: "d1-art",
      type: "art",
      time: "도착 후 오후",
      title: "우에노모리 미술관: 반 고흐 특별전",
      desc: "반 고흐 전시는 시간대를 정해 함께 관람하고, 이후 공연 전까지 개인별 자유 루트로 움직입니다.",
      mapLink: mapTo("Ueno Royal Museum"),
      siteLink: "https://www.ueno-mori.org/",
      ...artDetails.vanGogh,
    },
    {
      id: "d1-routes",
      type: "route",
      title: "1일차 빈 시간 대안 루트",
      desc: "18:00 우에노모리 미술관 재집결 전까지 전시, 식사, 휴식을 취향에 맞게 선택합니다.",
      routes: dayOneRoutes,
    },
    {
      id: "d1-food",
      type: "food",
      title: "1일차 자유식 후보",
      desc: "적어주신 식당 후보 기준입니다. 특정 스시집은 임의 지정하지 않고 우에노역 주변 후보 검색으로 연결했습니다.",
      restaurants,
    },
    {
      id: "d1-music",
      type: "music",
      time: "19:00",
      title: "임윤찬 공연 S석: 산토리홀",
      desc: "카메라타 잘츠부르크 협연. 공연 전 18:00 우에노모리 미술관 집결 후 이동합니다.",
      points: [
        "전날 이동과 전시 후 공연이므로 물, 간단한 간식, 얇은 겉옷을 준비하면 좋습니다.",
        "모차르트 협주곡은 피아노와 오케스트라가 주고받는 대화처럼 들으면 훨씬 선명합니다.",
        "공연 참고 링크: https://m.blog.naver.com/leggiero7/224287257656",
      ],
      program: [
        {
          title: "모차르트: 콘서트 아리아 '어찌 너를 잊으리오', K.505",
          link: "https://open.spotify.com/search/Mozart%20K505",
        },
        {
          title: "모차르트: 피아노 협주곡 24번 c단조, K.491",
          link: "https://open.spotify.com/search/Mozart%20Piano%20Concerto%2024%20K491",
        },
        {
          title: "모차르트: 피아노 협주곡 25번 C장조, K.503",
          link: "https://open.spotify.com/search/Mozart%20Piano%20Concerto%2025%20K503",
        },
      ],
      mapLink: mapTo("Suntory Hall Tokyo"),
      siteLink: "https://www.suntory.co.jp/suntoryhall/",
    },
    {
      id: "d1-hotel",
      type: "hotel",
      title: "선샤인시티 프린스 호텔 이케부쿠로",
      desc: "확정서 기준 1박. 방 타입은 5SGL + 11TWN + 1TG입니다.",
      mapLink: mapTo("Sunshine City Prince Hotel Ikebukuro"),
      siteLink: "https://www.princehotels.com/sunshine/",
    },
  ],
  2: [
    {
      id: "d2-bus",
      type: "bus",
      time: "10:00",
      title: "호텔 출발",
      desc: "전날 공연 후 도착이 늦어 버스 13시간 휴식 규정에 맞춰 10시에 출발합니다. 전 일정 대형버스 45인승 4일 이용, 현지 가이드 동행 기준입니다.",
    },
    {
      id: "d2-art",
      type: "art",
      time: "10:30",
      title: "국립신미술관: 폴 스미스 시선으로 본 피카소",
      desc: "롯폰기 국립신미술관에서 피카소 특별전을 관람합니다.",
      mapLink: mapTo("The National Art Center Tokyo"),
      siteLink: "https://www.nact.jp/",
      ...artDetails.picasso,
    },
    {
      id: "d2-lunch",
      type: "food",
      time: "12:00",
      title: "점심식사: 츠유샤브 치리리 시나가와점",
      desc: "확정서 기준 2일차 중식입니다.",
      restaurants: [confirmedMeals.d2Lunch],
    },
    {
      id: "d2-kamakura",
      type: "info",
      time: "14:00",
      title: "가마쿠라 수국사 관광",
      desc: "6월 수국철 가마쿠라 이동. 대표 후보는 메이게츠인, 하세데라 등이며 혼잡도를 보고 현장에서 조정합니다.",
      mapLink: mapTo("Meigetsuin Kamakura"),
      siteLink: "https://www.city.kamakura.kanagawa.jp/visitkamakura/en/",
      points: [
        "수국 절정기에는 역, 사찰 입구, 사진 포인트가 매우 혼잡하므로 일행과 집결 지점을 먼저 정합니다.",
        "비가 오면 돌계단과 흙길이 미끄러울 수 있어 운동화나 미끄럼 적은 신발이 좋습니다.",
        "사찰 내부에서는 삼각대, 긴 촬영 대기, 꽃을 만지는 행동을 피하고 동선을 막지 않습니다.",
        "가마쿠라에는 인기 기차역과 좁은 골목이 많아 이동 시간이 예상보다 길어질 수 있습니다.",
      ],
    },
    {
      id: "d2-move",
      type: "bus",
      time: "17:00",
      title: "하코네 이동",
      desc: "가마쿠라 관광 후 하코네 숙소로 이동합니다.",
      mapLink: mapTo("Susukinohara Ichinoyu Hakone"),
    },
    {
      id: "d2-hotel",
      type: "hotel",
      title: "스스키노하라 이치노유",
      desc: "확정서 기준 1박. 방 타입은 5SGL + 11TWN + 1TG + 1DV입니다.",
      mapLink: mapTo("Susukinohara Ichinoyu Hakone"),
      siteLink: "https://www.ichinoyu.co.jp/facilities/susuki/",
      restaurants: [confirmedMeals.d2Dinner],
    },
  ],
  3: [
    {
      id: "d3-art",
      type: "art",
      title: "하코네 오픈에어 뮤지엄: 조각의 숲",
      desc: "폴라 미술관 휴무 기간 대체 일정. 야외 조각과 피카소관 중심으로 관람합니다.",
      mapLink: mapTo("Hakone Open-Air Museum"),
      siteLink: "https://www.hakone-oam.or.jp/",
      ...artDetails.hakone,
    },
    {
      id: "d3-fuji",
      type: "info",
      title: "가와구치코 또는 호수 주변 후지산 감상",
      desc: "날씨와 구름 상태에 따라 후지산 조망 포인트를 조정합니다. 사진보다 실제 시야와 이동 시간을 우선합니다.",
      mapLink: mapTo("Lake Kawaguchiko"),
      points: [
        "후지산은 날씨 영향을 크게 받으므로 구름이 많으면 호수 산책과 휴식 중심으로 전환합니다.",
        "장거리 이동일이므로 버스 탑승 전 화장실과 물 준비를 챙깁니다.",
      ],
    },
    {
      id: "d3-lunch",
      type: "food",
      time: "12:00",
      title: "점심식사: 하코네엔",
      desc: "확정서 기준 3일차 중식입니다.",
      restaurants: [confirmedMeals.d3Lunch],
    },
    {
      id: "d3-move",
      type: "bus",
      title: "가루이자와 이동",
      desc: "하코네와 후지산 주변 일정을 마친 뒤 가루이자와로 이동합니다.",
      mapLink: mapTo("Hotel Indigo Karuizawa"),
    },
    {
      id: "d3-hotel",
      type: "hotel",
      title: "호텔 인디고 가루이자와",
      desc: "확정서 기준 1박. 방 타입은 5SGL + 11TWN + 1TG + 1DV입니다.",
      mapLink: mapTo("Hotel Indigo Karuizawa"),
      siteLink:
        "https://www.ihg.com/hotelindigo/hotels/us/en/karuizawa/qngka/hoteldetail",
      restaurants: [confirmedMeals.d3Dinner],
    },
  ],
  4: [
    {
      id: "d4-senju",
      type: "art",
      title: "가루이자와 히로시센주 미술관",
      desc: "가루이자와 자연과 건축, 센주의 폭포 연작을 함께 감상합니다.",
      mapLink: mapTo("Hiroshi Senju Museum Karuizawa"),
      siteLink: "https://www.senju-museum.jp/",
      ...artDetails.senju,
    },
    {
      id: "d4-hara",
      type: "art",
      title: "시부카와 하라뮤지엄 ARC",
      desc: "최근 방문자 추천 미술관. 군마현 시부카와의 자연 속 현대미술관입니다.",
      mapLink: mapTo("Hara Museum ARC Shibukawa"),
      siteLink: "https://www.haramuseum.or.jp/en/arc/",
      ...artDetails.haraArc,
    },
    {
      id: "d4-lunch",
      type: "food",
      time: "11:30 - 12:30",
      title: "점심식사: 로구테이 본점",
      desc: "확정서 기준 4일차 중식입니다.",
      restaurants: [confirmedMeals.d4Lunch],
    },
    {
      id: "d4-hotel",
      type: "hotel",
      title: "호텔 인디고 가루이자와 체크아웃",
      desc: "전일 숙소 기준 체크아웃. 짐 보관 또는 택배 이용 가능 여부는 호텔 프런트에서 확인합니다.",
      mapLink: mapTo("Hotel Indigo Karuizawa"),
      siteLink:
        "https://www.ihg.com/hotelindigo/hotels/us/en/karuizawa/qngka/hoteldetail",
    },
    {
      id: "d4-flight",
      type: "flight",
      time: "18:30 - 21:20",
      title: "나리타 국제공항 출발",
      desc: "제주항공 7C1108편. 14JUN26(일) 18:30 → 21:20, 도쿄 NRT 터미널 3 출발 → 서울 ICN 터미널 1 도착. 예약번호 H6BDFY, JEJU AIR 운항. 귀국 항공편 터미널과 집결 시간을 현장에서 최종 확인합니다.",
      mapLink: mapTo("Narita International Airport"),
    },
  ],
};

const renderIcon = (type) => {
  switch (type) {
    case "flight":
      return <Plane className="h-5 w-5 text-blue-500" />;
    case "art":
      return <Palette className="h-5 w-5 text-purple-500" />;
    case "music":
      return <Music className="h-5 w-5 text-indigo-500" />;
    case "hotel":
      return <Hotel className="h-5 w-5 text-orange-500" />;
    case "food":
      return <Utensils className="h-5 w-5 text-rose-500" />;
    case "bus":
      return <Bus className="h-5 w-5 text-cyan-600" />;
    case "route":
      return <Route className="h-5 w-5 text-emerald-600" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const IconLink = ({ href, type = "site", label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white"
  >
    {type === "map" ? (
      <MapPin className="h-4 w-4 text-blue-500" />
    ) : (
      <Globe className="h-4 w-4 text-emerald-600" />
    )}
  </a>
);

const DetailLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 font-bold text-indigo-700 underline decoration-indigo-200 underline-offset-2"
  >
    {children}
    <ExternalLink className="h-3 w-3" />
  </a>
);

const LinkedText = ({ text }) => {
  const urlPattern = /(https?:\/\/\S+)/g;
  const urlOnlyPattern = /^https?:\/\/\S+$/;
  const parts = text.split(urlPattern);

  return parts.map((part, idx) =>
    urlOnlyPattern.test(part) ? (
      <a
        key={idx}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-indigo-700 underline decoration-indigo-200 underline-offset-2"
      >
        {part}
      </a>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    ),
  );
};

const ListBlock = ({ title, items, tone = "purple" }) => {
  if (!items?.length) return null;
  const toneClass =
    tone === "amber"
      ? "border-amber-100 bg-amber-50 text-amber-950"
      : "border-purple-100 bg-purple-50 text-purple-950";

  return (
    <div className={`rounded-lg border p-3 ${toneClass}`}>
      <p className="mb-1 text-[10px] font-bold">{title}</p>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-[10px] leading-relaxed">
            - <LinkedText text={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ArtInfo = ({ item }) => (
  <div className="mt-3 space-y-2">
    <ListBlock title="관람 포인트" items={item.points} />

    {item.exhibition && (
      <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
        <p className="text-[10px] font-bold text-amber-900">대표 전시</p>
        <p className="text-[11px] leading-relaxed text-slate-800">
          <DetailLink href={item.exhibition.link}>
            {item.exhibition.title}
          </DetailLink>
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
          {item.exhibition.desc}
        </p>
      </div>
    )}

    {item.works?.map((work, idx) => (
      <div
        key={idx}
        className="rounded-lg border border-slate-100 bg-slate-50 p-3"
      >
        <p className="text-[10px] font-bold text-slate-500">대표 작품 / 작가</p>
        <p className="text-[11px] leading-relaxed text-slate-800">
          <DetailLink href={work.workLink}>{work.title}</DetailLink>
          <span className="text-slate-400"> · </span>
          <DetailLink href={work.artistLink}>{work.artist}</DetailLink>
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
          {work.summary}
        </p>
      </div>
    ))}
  </div>
);

const RouteInfo = ({ routes }) => (
  <div className="mt-3 space-y-3">
    {routes.map((route) => (
      <div key={route.name} className="rounded-lg border border-slate-200 p-3">
        <p className="text-xs font-bold text-slate-800">{route.name}</p>
        <p className="mt-1 text-[10px] font-bold text-emerald-700">
          {route.flow}
        </p>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
          추천: {route.bestFor}
        </p>
        <p className="text-[10px] leading-relaxed text-slate-500">
          {route.note}
        </p>
        {route.art && <ArtInfo item={route.art} />}
      </div>
    ))}
  </div>
);

const RestaurantInfo = ({ restaurants: items }) => (
  <div className="mt-3 space-y-2">
    {items.map((restaurant) => (
      <div
        key={restaurant.name}
        className="rounded-lg border border-rose-100 bg-rose-50 p-3"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800">
              {restaurant.name}
            </p>
            <p className="text-[10px] font-bold text-rose-700">
              추천 메뉴: {restaurant.menu}
            </p>
          </div>
          <div className="flex gap-1">
            <IconLink href={restaurant.mapLink} type="map" label="길찾기" />
            <IconLink href={restaurant.siteLink} label="식당 링크" />
          </div>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-slate-600">
          {restaurant.desc}
        </p>
      </div>
    ))}
  </div>
);

const ProgramInfo = ({ program }) => (
  <div className="mt-3 space-y-2">
    {program.map((item) => (
      <div
        key={item.title}
        className="flex items-center justify-between gap-2 rounded border border-slate-100 bg-slate-50 p-2"
      >
        <span className="text-[10px] font-medium leading-snug text-slate-700">
          {item.title}
        </span>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded border border-green-200 bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700"
        >
          듣기
        </a>
      </div>
    ))}
  </div>
);

const EventCard = ({ event }) => (
  <div className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
    <div className="mb-2 flex items-start gap-3">
      <div className="rounded-lg bg-slate-100 p-2">
        {renderIcon(event.type)}
      </div>
      <div className="min-w-0 flex-1">
        {event.time && (
          <div className="text-[10px] font-bold uppercase text-slate-400">
            {event.time}
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold leading-snug text-slate-800">
            {event.title}
          </h3>
          <div className="flex shrink-0 gap-1">
            {event.mapLink && (
              <IconLink href={event.mapLink} type="map" label="길찾기" />
            )}
            {event.siteLink && (
              <IconLink href={event.siteLink} label="홈페이지" />
            )}
          </div>
        </div>
      </div>
    </div>

    <p className="text-xs leading-relaxed text-slate-600">{event.desc}</p>

    {event.type === "art" && <ArtInfo item={event} />}
    {event.type === "route" && <RouteInfo routes={event.routes} />}
    {event.restaurants && <RestaurantInfo restaurants={event.restaurants} />}
    {event.points && event.type !== "art" && (
      <ListBlock title="포인트 / 주의사항" items={event.points} tone="amber" />
    )}
    {event.program && <ProgramInfo program={event.program} />}
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-slate-50 pb-24 font-sans shadow-xl">
      <header className="sticky top-0 z-50 bg-slate-900 p-5 text-white shadow-md">
        <h1 className="text-xl font-bold">임윤찬 x 도쿄 아트 투어</h1>
        <p className="mt-1 text-xs text-slate-300">
          공연, 미술관, 숙소, 자유시간 대안 루트
        </p>
        <div className="mt-3 space-y-1 rounded-lg border border-slate-700 bg-slate-800/70 p-3 text-xs leading-relaxed text-slate-100">
          <p className="font-bold">차순 010-5663-5153</p>
          <p>
            카톡{" "}
            <a
              href="http://pf.kakao.com/_gIxlNb"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-200 underline decoration-sky-400/60 underline-offset-2"
            >
              http://pf.kakao.com/_gIxlNb
            </a>
          </p>
          <p>
            참고 사이트 일정{" "}
            <a
              href="https://tokyo2026061102.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sky-200 underline decoration-sky-400/60 underline-offset-2"
            >
              https://tokyo2026061102.vercel.app/
            </a>
          </p>
        </div>
      </header>

      <div className="sticky top-[86px] z-40 flex bg-white shadow-sm">
        {[1, 2, 3, 4].map((day) => (
          <button
            key={day}
            onClick={() => setActiveTab(day.toString())}
            className={`flex-1 border-b-2 py-3 text-center text-sm font-bold ${
              activeTab === day.toString()
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-transparent text-gray-500"
            }`}
          >
            {day}일차
          </button>
        ))}
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-[10px] leading-relaxed text-slate-600">
              호텔은 확보 전 요청 조건 기준이며, 진행 확정 시 객실 유무와 금액이
              변동될 수 있습니다. 일본 버스는 사용시간 총 9시간 규정과 하차 후
              다음 출발까지 13시간 휴식 규정을 고려합니다.
            </p>
          </div>
        </div>

        {itinerary[activeTab].map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default App;
