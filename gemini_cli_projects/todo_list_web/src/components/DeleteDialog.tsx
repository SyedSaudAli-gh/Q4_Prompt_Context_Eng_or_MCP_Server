import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useTheme } from '../lib/context/ThemeContext';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog = ({ isOpen, onClose, onConfirm }: DeleteDialogProps) => {
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
          <AlertDialogContent className={`${theme.background} ${theme.text} p-6 rounded-lg shadow-xl`}>
            <AlertDialogHeader>
              <AlertDialogTitle className={`${theme.text}`}>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className={`${theme.text} opacity-80`}>
                This action cannot be undone. This will permanently delete your
                task and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={`${theme.text} border-${theme.accent} hover:bg-${theme.accent} hover:text-white`}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm} className="bg-red-600 text-white hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AnimatePresence>
  );
};

export default DeleteDialog;
