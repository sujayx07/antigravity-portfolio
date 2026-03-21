"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000);
  const innerWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
  const innerHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};
export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const starRef = useRef<ShootingStar | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      starRef.current = {
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
      
      if (rectRef.current) {
        rectRef.current.style.display = "block";
      }

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => clearTimeout(timeoutId);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    let animationFrame: number;

    const moveStar = () => {
      if (starRef.current && rectRef.current) {
        const prevStar = starRef.current;
        const newX =
          prevStar.x +
          prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
        const newY =
          prevStar.y +
          prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
        const newDistance = prevStar.distance + prevStar.speed;
        const newScale = 1 + newDistance / 100;
        
        if (
          newX < -20 ||
          newX > window.innerWidth + 20 ||
          newY < -20 ||
          newY > window.innerHeight + 20
        ) {
          starRef.current = null;
          rectRef.current.style.display = "none";
        } else {
          starRef.current = {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
          
          rectRef.current.setAttribute("x", newX.toString());
          rectRef.current.setAttribute("y", newY.toString());
          rectRef.current.setAttribute("width", (starWidth * newScale).toString());
          rectRef.current.setAttribute(
            "transform",
            `rotate(${prevStar.angle}, ${newX + (starWidth * newScale) / 2}, ${newY + starHeight / 2})`
          );
        }
      }
      animationFrame = requestAnimationFrame(moveStar);
    };

    animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [starWidth, starHeight]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0 pointer-events-none transform-gpu", className)}
    >
      <rect
        ref={rectRef}
        height={starHeight}
        fill="url(#gradient)"
        style={{ display: "none", willChange: "transform" }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
