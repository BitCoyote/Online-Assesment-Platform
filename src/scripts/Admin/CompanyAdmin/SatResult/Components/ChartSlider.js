import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./index.css"

const Scrollbar = ({
  children,
  className,
  ...props
}) => {
  const contentRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const observer = useRef(null);
  const [thumbWidth, setThumbWidth] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState(
    0
  );
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleResize(ref, trackSize) {
    const { clientWidth, scrollWidth } = ref;
    const w = Math.max((clientWidth / scrollWidth) * trackSize, 20);
    setThumbWidth(w);
  }

  const handleTrackClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const trackLeft = rect.Left;
        const thumbOffset = -(thumbWidth / 2);
        const clickRatio =
          (clientY - trackLeft + thumbOffset) / trackCurrent.clientWidth;
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollWidth
        );
        contentCurrent.scrollTo({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbWidth]
  );

  const handleThumbPosition = useCallback(() => {
    console.log(contentRef.current, scrollTrackRef.current, scrollThumbRef.current)
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollLeft: contentLeft, scrollWidth: contentWidth } =
      contentRef.current;
    const { clientWidth: trackWidth } = scrollTrackRef.current;
    let newLeft = (+contentLeft / +contentWidth) * trackWidth;
    newLeft = Math.min(newLeft, trackWidth - thumbWidth);
    console.log(newLeft)
    const thumb = scrollThumbRef.current;
    thumb.style.left = `${newLeft}px`;
  }, []);

  const handleThumbMousedown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientX);
    //console.log('mouse downed: ' + e.clientX)
    if (contentRef.current) setInitialScrollLeft(contentRef.current.scrollLeft);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const {
          scrollWidth: contentScrollWidth,
          offsetWidth: contentOffsetWidth,
        } = contentRef.current;
        const deltaX =
          (e.clientX - scrollStartPosition) *
          (contentOffsetWidth / thumbWidth);
        const newScrollLeft = Math.min(
          initialScrollLeft + deltaX,
          contentScrollWidth - contentOffsetWidth
        );
        // console.log('contentScrollWidth: ' + contentScrollWidth
        // , 'contentOffsetWidth: ' + contentOffsetWidth
        // , 'e.clientX: ' + e.clientX
        // , 'scrollStartPosition' + scrollStartPosition
        // , newScrollLeft)
        contentRef.current.scrollLeft = newScrollLeft;
      }
    },
    [initialScrollLeft, isDragging, scrollStartPosition, thumbWidth]
  );

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust Width of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientWidth: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      console.log('registered', ref)
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
  }, [handleThumbPosition]);

  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <div className="custom-scrollbars__container" >
      <div className="custom-scrollbars__content" ref={contentRef} {...props}>
            {children}
      </div>
      <div className="custom-scrollbars__scrollbar">
        <div className="custom-scrollbars__track-and-thumb">
          <div
            className="custom-scrollbars__track"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging && 'grabbing' }}
          ></div>
          <div
            className="custom-scrollbars__thumb"
            ref={scrollThumbRef}
            onMouseDown={handleThumbMousedown}
            style={{
              width: `${thumbWidth}px`,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Scrollbar;
