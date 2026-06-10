# blogPost

## **NestJS 기반의 고성능·이벤트 기반 블로그 백엔드 API 서버**
> 본 프로젝트는 기본적인 CRUD 아키텍처에서 출발하여, 대용량 트래픽 상황을 가정하고 데이터베이스 병목 해소 및 시스템 결합도 완화를 위해 **Redis 캐싱**과 **RabbitMQ 비동기 메시징**을 도입한 백엔드 아키텍처 고도화 프로젝트입니다.

## 🛠 기술 스택 (Tech Stack)
- **Framework & Language:** NestJS, TypeScript
- **Database:** MongoDB, Mongoose (ODM)
- **Caching:** Redis
- **Message Broker:** RabbitMQ
- **Authentication:** JWT (Access Token / Refresh Token)

## ✨ 핵심 아키텍처 및 구현 스펙 (Key Features)
### 1. 데이터 레이어 최적화 및 무결성 (MongoDB & Mongoose)
- **인덱싱 최적화 (`set index`):** 조회 빈도가 높은 도메인 필드에 인덱스를 선제적으로 설정하여 NoSQL 환경에서의 쿼리 수행 속도를 최적화했습니다.
- **글로벌 논리 삭제 필터 (Soft Delete):** `User`, `Post`, `Comment` 도메인 전반에 Mongoose pre-middleware를 활용한 소프트 딜리트 메커니즘을 적용하여, 데이터 보존 정책을 준수함과 동시에 조회 시 삭제된 데이터가 자동 필터링되도록 구현했습니다.

### 2. 분산 캐싱을 통한 조회 성능 개선 (Redis)
- **Cache-Aside 패턴 도입:** 블로그 특성상 읽기(Read) 요청이 쓰기(Write)보다 압도적으로 많은 조회 중심 트래픽을 효율적으로 처리하기 위해 전체 게시물 조회 API에 Redis 캐시 레이어를 구축했습니다.
- **캐시 일관성 유지:** 게시글 생성(`create`) 및 수정(`update`) 이벤트 발생 시 Redis 내의 캐시 데이터를 적절히 갱신/무효화하여 데이터 일관성을 보장합니다.

### 3. 비동기 이벤트 기반 알림 시스템 (RabbitMQ)
- **시스템 결합도 완화 (Decoupling):** 게시글 작성 및 댓글 등록 시 유저에게 발송되는 알림 로직을 메인 API 스레드와 완전 분리하여 비동기 이벤트 기반 아키텍처(EDA)를 실험했습니다.
- **비동기 큐 처리:** 무거운 알림 발송 이벤트를 RabbitMQ에 프로듀싱하고 백그라운드의 컨슈머(`notification.consumer.ts`)가 메시지를 소비하게 함으로써, 외부 I/O 지연이 메인 비즈니스 서버의 응답성을 저해하지 않도록 설계했습니다. Kafka 대비 현재 도메인 규모에 적합하고 유연한 라우팅이 가능한 RabbitMQ를 채택하여 오버엔지니어링을 지양했습니다.

### 4. 실무 레벨의 인증 및 권한 제어 (RBAC & Security)
- **토큰 기반 인증:** JWT 기반의 `Access Token` 및 `Refresh Token` 체계를 구축하여 안전한 인증 유지 및 토큰 만료 예외 처리를 고려했습니다.
- **역할 기반 접근 제어 (RBAC):** JWT Payload 내 `role` 값을 검증하는 커스텀 `Role Guard`를 구현하여 관리자(Admin) 권한과 일반 유저 권한에 따른 API 엔드포인트 접근을 엄격히 통제합니다.

## 📂 디렉토리 구조 (Directory Structure)
```
src/
├── auth/          # JWT 인증, Refresh Token 및 Guard 관리
├── user/          # 유저 도메인 (RBAC 포함)
├── post/          # 게시글 도메인 (Redis 캐싱 연동)
├── comment/       # 댓글 도메인
├── notification/  # RabbitMQ Consumer 및 비동기 알림 처리
└── config/        # 환경변수(env) 및 DB 연결 설정
```
