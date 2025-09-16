import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Task } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
        completedAt: doc.data().completedAt?.toDate(),
      })) as Task[];
      
      // Handle recurring tasks - reset completed status if completed yesterday or earlier
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      tasksData.forEach(async (task) => {
        if (task.recurrent && task.completed && task.completedAt) {
          const completedDate = new Date(task.completedAt);
          completedDate.setHours(0, 0, 0, 0);
          
          // If task was completed before today, reset it
          if (completedDate < today) {
            try {
              await updateTask(task.id, { completed: false });
            } catch (error) {
              console.error('Error resetting recurring task:', error);
            }
          }
        }
      });
      
      // Sort tasks by createdAt in descending order (newest first)
      tasksData.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
      
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    await addDoc(collection(db, 'tasks'), {
      ...taskData,
      priority: taskData.priority || 'None',
      recurrent: taskData.recurrent || false,
      userId: currentUser.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updateData: any = {
      ...updates,
      updatedAt: new Date(),
    };

    // If completing a task, set completedAt
    if (updates.completed === true) {
      updateData.completedAt = new Date();
    } else if (updates.completed === false) {
      updateData.completedAt = null;
    }

    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updateData);
  };

  const deleteTask = async (id: string) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await updateTask(id, { completed });
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};