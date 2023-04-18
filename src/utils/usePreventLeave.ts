export function usePreventLeave() {
  function listener(e: any) {
    e.preventDefault();
    e.returnValue = '';
  }

  function enablePrevent() {
    window.addEventListener('beforeunload', listener);
  }

  function disablePrevent() {
    window.removeEventListener('beforeunload', listener);
  }

  return { enablePrevent, disablePrevent };
}
