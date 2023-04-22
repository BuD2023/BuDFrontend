import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

function useErrorBoundary(): ErrorBoundaryState {
  const [state, setState] = React.useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    errorInfo: null,
  });

  const componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
    // 에러가 발생한 경우 처리 로직을 수행
    setState({
      hasError: true,
      error,
      errorInfo,
    });
  };

  React.useEffect(() => {
    // componentDidCatch 함수를 window 객체에 등록
    window.addEventListener('error', componentDidCatch as unknown as EventListener);

    // 컴포넌트 언마운트 시 componentDidCatch 함수를 제거
    return () => {
      window.removeEventListener('error', componentDidCatch as unknown as EventListener);
    };
  }, []);

  return state;
}

export default useErrorBoundary;
