import { useState, useCallback } from 'react';
// import { 
//   getMyProfile, 
//   getMyPoints, 
//   getMyReservations, 
//   getMyReviews, 
//   getMyInquiries, 
//   deleteMe 
// } from '../services/mypage';

export const useMyProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // const result = await getMyProfile();
      // setData(result);
      console.log('프로필 데이터 로드 예정');
    } catch (err) {
      setError(err.message);
      console.error('프로필 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export const useMyPoints = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      // const result = await getMyPoints({ page, size });
      // setData(result);
      console.log(`포인트 데이터 로드 예정 - 페이지: ${page}, 사이즈: ${size}`);
    } catch (err) {
      setError(err.message);
      console.error('포인트 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export const useMyReservations = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      // const result = await getMyReservations({ page, size });
      // setData(result);
      console.log(`예약 내역 데이터 로드 예정 - 페이지: ${page}, 사이즈: ${size}`);
    } catch (err) {
      setError(err.message);
      console.error('예약 내역 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export const useMyReviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      // const result = await getMyReviews({ page, size });
      // setData(result);
      console.log(`리뷰 데이터 로드 예정 - 페이지: ${page}, 사이즈: ${size}`);
    } catch (err) {
      setError(err.message);
      console.error('리뷰 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export const useMyInquiries = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      // const result = await getMyInquiries({ page, size });
      // setData(result);
      console.log(`문의 내역 데이터 로드 예정 - 페이지: ${page}, 사이즈: ${size}`);
    } catch (err) {
      setError(err.message);
      console.error('문의 내역 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
};

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteAccount = useCallback(async () => {
    if (!window.confirm('정말로 회원 탈퇴하시겠습니까?')) {
      return false;
    }

    setLoading(true);
    setError(null);
    try {
      // await deleteMe();
      console.log('회원 탈퇴 처리 예정');
      alert('회원 탈퇴가 완료되었습니다.');
      return true;
    } catch (err) {
      setError(err.message);
      console.error('회원 탈퇴 실패:', err);
      alert('회원 탈퇴에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteAccount, loading, error };
};