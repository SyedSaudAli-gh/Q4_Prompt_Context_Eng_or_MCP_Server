"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from "sonner";
import { Task } from '../lib/types';
import { useTheme } from '../lib/context/ThemeContext';

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  editTask: (id: string, newTitle: string) => void;
}

const EditTaskDialog = ({ isOpen, onClose, task, editTask }: EditTaskDialogProps) => {
  const [editedTitle, setEditedTitle] = useState(task?.title || '');
  const { theme } = useTheme();

  useEffect(() => {
    setEditedTitle(task?.title || '');
  }, [task]);

  const handleSave = () => {
    if (!task) return;
    if (!editedTitle.trim()) {
      toast.error('Task title cannot be empty!');
      return;
    }
    editTask(task.id, editedTitle);
    toast.success('Task updated successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className={`${theme.background} ${theme.text} sm:max-w-[425px] p-6 rounded-lg shadow-xl`}>
            <DialogHeader>
              <DialogTitle className={`${theme.text}`}>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className={`${theme.secondary} ${theme.text} border-none focus:ring-2 focus:ring-${theme.accent}`}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose} className={`${theme.text} border-${theme.accent} hover:bg-${theme.accent} hover:text-white`}>
                Cancel
              </Button>
              <Button onClick={handleSave} className={`${theme.accent} text-white`}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditTaskDialog;
