import React from "react";
import { SiReact } from "react-icons/si"; // React icon

export default function Footer() {
  return (
    <footer className="mt-10 py-4 text-center text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-100">
      <div className="flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center gap-2 text-sm">
          Weather Dashboard — Built with{" "}
          <SiReact className="text-sky-500 animate-spin-slow" size={18} />
          <span>ReactJS</span>
        </div>
        <p className="mt-1 text-xs opacity-80">
          <span className="font-semibold text-blue-500 hover:text-blue-600 transition">
            &copy;
            Steven
          </span>
        </p>
      </div>
    </footer>
  );
}
