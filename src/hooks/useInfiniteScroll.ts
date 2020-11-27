import { useState, useEffect, useRef } from "react";

interface IProps<T> {
  list: T[];
  scrollEdgeRef: React.RefObject<Element>;
  maxNum?: number;
  offsetY?: number;
}

const useInfiniteScroll = <T>({ list, scrollEdgeRef, maxNum = 50, offsetY = 300 }: IProps<T>): T[] => {
  const [hasMore, setHasMore] = useState(false);
  const [currentList, setCurrentList] = useState<T[]>([]);
  const [observerLoading, setObserverLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setHasMore(list.length > maxNum);
    setCurrentList((prevList) => [...list.slice(0, prevList.length)]);
  }, [list, maxNum]);

  useEffect(() => {
    const loadEdges = () => {
      const more = currentList.length < list.length;
      setHasMore(more);
      more && setCurrentList([...list.slice(0, currentList.length + maxNum)]);
    };

    const scrollEdgeElem = scrollEdgeRef.current;

    const option = {
      rootMargin: `0px 0px ${offsetY}px 0px`,
      threshold: [0],
    };

    observer.current = new IntersectionObserver((entries) => {
      if (!hasMore) return;
      entries.forEach((entry) => {
        if (!observerLoading) {
          setObserverLoading(true);
          return;
        }
        if (entry.isIntersecting) loadEdges();
      });
    }, option);

    if (scrollEdgeElem !== null) observer.current.observe(scrollEdgeElem);
    return () => observer.current?.disconnect();
  });

  return currentList;
};

export default useInfiniteScroll;
