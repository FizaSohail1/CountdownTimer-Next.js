'use client'
import React, { useRef, useState, useEffect, ChangeEvent } from 'react';

const CountdownTimer = () => {
    const [duration, setDuration] = useState<number | string>('');
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if (typeof duration === 'number' && duration > 0) {
            setTimeLeft(duration);
            setIsPaused(false);
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === 'number' ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((time) => {
                    if (time <= 1) {
                        clearInterval(timerRef.current as NodeJS.Timeout);
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || '');
    };

    return (
        <>
            <div className='mx-auto text-3xl font-bold text-center my-8'>
                <h1>Countdown Timer</h1>
            </div>
            <div className='mx-auto bg-gray-200 p-6 rounded-md shadow-md w-72'>
                <input
                    type="text"
                    id="duration"
                    placeholder="Enter duration in seconds"
                    value={duration}
                    onChange={handleDurationChange}
                    className="w-full p-2 mb-4 rounded-md border text-black border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleSetDuration}
                    className="w-full p-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    Set
                </button>
            </div>
            <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleStart}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                    {isPaused ? 'Resume' : 'Start'}
                </button>
                <button
                    onClick={handlePause}
                    className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                >
                    Pause
                </button>
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    Reset
                </button>
            </div>
        </>
    );
};

export default CountdownTimer;
