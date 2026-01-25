import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // スムーズスクロールではなく、パッと切り替える（演出はFramer Motionに任せる）
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
