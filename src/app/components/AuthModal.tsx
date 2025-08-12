'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { RootState } from "@/store";
import { closeModal, openModal } from "@/store/feature/authModalSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowLeft, UserPlus, LogIn } from "lucide-react";

export default function AuthModal() {
    const dispatch = useDispatch();
    const { isTurnOn, mode } = useSelector((state: RootState) => state.authModal)
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentMode, setCurrentMode] = useState(mode);

    // Handle mode changes with animation
    useEffect(() => {
        if (mode !== currentMode) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentMode(mode);
                setIsAnimating(false);
            }, 200);
        }
    }, [mode, currentMode]);

    const switchMode = (newMode: 'login' | 'register') => {
        if (newMode !== mode) {
            dispatch(openModal(newMode));
        }
    };

    return (
        <Dialog open={isTurnOn} onOpenChange={() => dispatch(closeModal())}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
                
                {/* Header with animated tabs */}
                <div className="relative">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <button
                            onClick={() => switchMode('login')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                                mode === 'login'
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <LogIn size={16} />
                                Đăng nhập
                            </div>
                            {mode === 'login' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform origin-center animate-in slide-in-from-left duration-300" />
                            )}
                        </button>
                        <button
                            onClick={() => switchMode('register')}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative ${
                                mode === 'register'
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <UserPlus size={16} />
                                Đăng ký
                            </div>
                            {mode === 'register' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transform origin-center animate-in slide-in-from-right duration-300" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="relative px-6 pt-6 pb-4">
                    {/* Animated Title */}
                    <DialogHeader className="space-y-3 mb-6">
                        <DialogTitle className={`text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent transition-all duration-300 ${
                            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                        }`}>
                            {currentMode === "login" ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
                        </DialogTitle>
                        <DialogDescription className={`text-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${
                            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                        }`}>
                            {currentMode === "login"
                                ? "Đăng nhập để tiếp tục hành trình của bạn"
                                : "Bắt đầu hành trình mới cùng chúng tôi" 
                            }
                        </DialogDescription>
                    </DialogHeader>

                    {/* Animated Form Container */}
                    <div className="relative overflow-hidden">
                        <div className={`transition-all duration-300 ease-in-out ${
                            isAnimating 
                                ? 'opacity-0 translate-x-4 scale-95' 
                                : 'opacity-100 translate-x-0 scale-100'
                        }`}>
                            {currentMode === "login" ? (
                                <div className="space-y-4">
                                    <LoginForm />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <RegisterForm />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Animated Switch Prompt */}
                    <div className={`mt-6 text-center transition-all duration-300 ${
                        isAnimating ? 'opacity-0' : 'opacity-100'
                    }`}>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {currentMode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                            <button
                                onClick={() => switchMode(currentMode === "login" ? "register" : "login")}
                                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                            >
                                {currentMode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Animated Footer */}
                <DialogFooter className={`px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                }`}>
                    <DialogClose asChild>
                        <Button 
                            variant="outline" 
                            className="group hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-0.5 transition-transform duration-200" />
                            Hủy
                        </Button>
                    </DialogClose>
                </DialogFooter>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-lg" />
            </DialogContent>
        </Dialog>
    );
}