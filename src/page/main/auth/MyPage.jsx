import React, { useState, useEffect } from 'react';
import './css/mypage.css';
import {
    useMyProfile,
    useMyPoints,
    useMyReservations,
    useMyReviews,
    useMyInquiries,
    useDeleteAccount
} from './hook/useMypage';

const MyPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    // 커스텀 훅들
    const profile = useMyProfile();
    const points = useMyPoints();
    const reservations = useMyReservations();
    const reviews = useMyReviews();
    const inquiries = useMyInquiries();
    const { deleteAccount } = useDeleteAccount();

    // 탭 변경 시 해당 데이터 로드
    // useEffect(() => {
    //     switch (activeTab) {
    //         case 'profile':
    //             if (!profile.data && !profile.loading) profile.fetch();
    //             break;
    //         case 'points':
    //             if (!points.data && !points.loading) points.fetch();
    //             break;
    //         case 'reservations':
    //             if (!reservations.data && !reservations.loading) reservations.fetch();
    //             break;
    //         case 'reviews':
    //             if (!reviews.data && !reviews.loading) reviews.fetch();
    //             break;
    //         case 'inquiries':
    //             if (!inquiries.data && !inquiries.loading) inquiries.fetch();
    //             break;
    //     }
    // }, [activeTab]);

    const renderTabContent = () => {
        const getCurrentData = () => {
            switch (activeTab) {
                case 'profile': return profile;
                case 'points': return points;
                case 'reservations': return reservations;
                case 'reviews': return reviews;
                case 'inquiries': return inquiries;
                default: return { loading: false, data: null, error: null };
            }
        };

        const { loading, data, error } = getCurrentData();

        if (loading) {
            return <div className="loading">로딩 중...</div>;
        }

        if (error) {
            return <div className="error-state">오류가 발생했습니다: {error}</div>;
        }

        switch (activeTab) {
            case 'profile':
                return (
                    <div className="profile-section">
                        <h3>내 정보</h3>
                        {data ? (
                            <div className="profile-info">
                                <div className="info-item">
                                    <label>이름:</label>
                                    <span>{data.name}</span>
                                </div>
                                <div className="info-item">
                                    <label>권한:</label>
                                    <span>{data.role}</span>
                                </div>
                                <div className="info-item">
                                    <label>가입일:</label>
                                    <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="info-item">
                                    <label>최근 로그인:</label>
                                    <span>{new Date(data.lastLoginAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="empty-state">프로필 정보를 불러올 수 없습니다.</div>
                        )}
                        <button onClick={deleteAccount} className="delete-btn">
                            회원 탈퇴
                        </button>
                    </div>
                );

            case 'points':
                return (
                    <div className="points-section">
                        <h3>포인트 내역</h3>
                        {data?.content?.length > 0 ? (
                            <>
                                <div className="points-summary">
                                    <span>총 {data.totalElements}개의 포인트 내역</span>
                                </div>
                                <div className="points-list">
                                    {data.content.map((point) => (
                                        <div key={point.id} className="point-item">
                                            <div className="point-info">
                                                <span className={`point-type ${point.type.toLowerCase()}`}>
                                                    {point.type === 'EARN' ? '+' : ''}{point.amount}P
                                                </span>
                                                {point.description && (
                                                    <span className="point-description">{point.description}</span>
                                                )}
                                            </div>
                                            <span className="point-date">
                                                {new Date(point.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                {data.totalPages > 1 && (
                                    <div className="pagination">
                                        {/* 페이지네이션 추후 구현 */}
                                        <span>페이지 {data.number + 1} / {data.totalPages}</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="empty-state">포인트 내역이 없습니다.</div>
                        )}
                    </div>
                );

            case 'reservations':
                return (
                    <div className="reservations-section">
                        <h3>예약 내역</h3>
                        {data?.content?.length > 0 ? (
                            <>
                                <div className="section-summary">
                                    <span>총 {data.totalElements}개의 예약</span>
                                </div>
                                <div className="reservations-list">
                                    {data.content.map((reservation) => (
                                        <div key={reservation.id} className="reservation-item">
                                            <div className="reservation-info">
                                                <h4>{reservation.productName}</h4>
                                                <p>예약일: {reservation.date}</p>
                                                <p>상태: <span className={`status ${reservation.status?.toLowerCase()}`}>
                                                    {reservation.status}
                                                </span></p>
                                                <p>금액: {reservation.amount?.toLocaleString()}원</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">예약 내역이 없습니다.</div>
                        )}
                    </div>
                );

            case 'reviews':
                return (
                    <div className="reviews-section">
                        <h3>리뷰 내역</h3>
                        {data?.content?.length > 0 ? (
                            <>
                                <div className="section-summary">
                                    <span>총 {data.totalElements}개의 리뷰</span>
                                </div>
                                <div className="reviews-list">
                                    {data.content.map((review) => (
                                        <div key={review.id} className="review-item">
                                            <h4>{review.productName}</h4>
                                            <div className="rating">
                                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                                <span className="rating-number">({review.rating}/5)</span>
                                            </div>
                                            <p className="review-content">{review.content}</p>
                                            <span className="review-date">{review.createdAt}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">작성한 리뷰가 없습니다.</div>
                        )}
                    </div>
                );

            case 'inquiries':
                return (
                    <div className="inquiries-section">
                        <h3>문의 내역</h3>
                        {data?.content?.length > 0 ? (
                            <>
                                <div className="section-summary">
                                    <span>총 {data.totalElements}개의 문의</span>
                                </div>
                                <div className="inquiries-list">
                                    {data.content.map((inquiry) => (
                                        <div key={inquiry.id} className="inquiry-item">
                                            <h4>{inquiry.title}</h4>
                                            <div className="inquiry-meta">
                                                <span className={`status ${inquiry.status?.toLowerCase()}`}>
                                                    {inquiry.status === 'ANSWERED' ? '답변완료' : '답변대기'}
                                                </span>
                                                <span className="inquiry-date">{inquiry.createdAt}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">문의 내역이 없습니다.</div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="mypage-container">
            <aside className="sidebar">
                <ul>
                    <li
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        회원정보
                    </li>
                    <li
                        className={activeTab === 'points' ? 'active' : ''}
                        onClick={() => setActiveTab('points')}
                    >
                        포인트 내역
                    </li>
                    <li
                        className={activeTab === 'reservations' ? 'active' : ''}
                        onClick={() => setActiveTab('reservations')}
                    >
                        예약 내역
                    </li>
                    <li
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveTab('reviews')}
                    >
                        리뷰 내역
                    </li>
                    <li
                        className={activeTab === 'inquiries' ? 'active' : ''}
                        onClick={() => setActiveTab('inquiries')}
                    >
                        문의 내역
                    </li>
                </ul>
            </aside>


            {/* 본문 */}
            <main className="content">
                <div className="profile-card">
                    <div className="info-row">
                        <span className="label">이름:</span>
                        <span>{profile?.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">가입일:</span>
                        <span>{profile?.createdAt}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">최근 로그인:</span>
                        <span>{profile?.lastLoginAt}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">권한:</span>
                        <span>{profile?.role}</span>
                    </div>
                    <button className="delete-btn">회원 탈퇴</button>
                </div>
            </main>
        </div>
    );
};

export default MyPage;