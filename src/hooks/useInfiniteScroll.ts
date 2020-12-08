import { useState, useEffect, useRef } from "react";

interface IProps<T> {
  list: T[];
  scrollEdgeRef: React.RefObject<Element>;
  maxNum?: number;
  offsetY?: number;
}

const useInfiniteScroll = <T>({ list, scrollEdgeRef, maxNum = 50, offsetY = 300 }: IProps<T>): T[] => {
  const [currentList, setCurrentList] = useState<T[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setCurrentList((prevList) => list.slice(0, prevList.length));
  }, [list, maxNum]);

  useEffect(() => {
    const loadEdges = () => {
      setCurrentList((prevList) =>
        prevList.length < list.length ? list.slice(0, prevList.length + maxNum) : prevList,
      );
    };

    const scrollEdgeElem = scrollEdgeRef.current;

    const option = {
      rootMargin: `0px 0px ${offsetY}px 0px`,
      threshold: [0],
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) loadEdges();
      });
    }, option);

    if (scrollEdgeElem !== null) observer.current.observe(scrollEdgeElem);
    return () => observer.current?.disconnect();
  }, [list, maxNum, offsetY, scrollEdgeRef]);

  return currentList;
};

export default useInfiniteScroll;
