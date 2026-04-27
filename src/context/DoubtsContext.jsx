import { createContext, useContext, useState, useCallback } from 'react';

const DoubtsContext = createContext(null);

const initialDoubts = [
  {
    id: 1,
    studentId: 'CS2021001',
    student: 'John Doe',
    subject: 'Machine Learning',
    title: 'Query about Neural Networks',
    description: 'I am confused about how backpropagation works in neural networks. Can you explain the gradient descent process?',
    status: 'pending',
    response: '',
    createdAt: '2024-01-20',
    respondedAt: null
  },
  {
    id: 2,
    studentId: 'CS2021002',
    student: 'Jane Smith',
    subject: 'Database Systems',
    title: 'SQL Join Operations',
    description: 'What is the difference between LEFT JOIN and RIGHT JOIN? When should I use each?',
    status: 'pending',
    response: '',
    createdAt: '2024-01-22',
    respondedAt: null
  },
  {
    id: 3,
    studentId: 'CS2021001',
    student: 'John Doe',
    subject: 'Artificial Intelligence',
    title: 'A* Algorithm',
    description: 'How does the heuristic function affect the performance of A* search algorithm?',
    status: 'answered',
    response: 'The heuristic function directly impacts A* efficiency. An admissible heuristic never overestimates the cost, ensuring optimality. A consistent heuristic also satisfies the triangle inequality, which guarantees efficiency.',
    createdAt: '2024-01-18',
    respondedAt: '2024-01-19'
  },
  {
    id: 4,
    studentId: 'CS2021003',
    student: 'Mike Johnson',
    subject: 'Web Development',
    title: 'React Hooks Question',
    description: 'When should I use useMemo vs useCallback in React?',
    status: 'answered',
    response: 'useMemo is for memoizing computed values, while useCallback is for memoizing function references. Use useMemo when you have expensive calculations, and useCallback when passing callbacks to child components.',
    createdAt: '2024-01-15',
    respondedAt: '2024-01-16'
  }
];

export const DoubtsProvider = ({ children }) => {
  const [doubts, setDoubts] = useState(initialDoubts);

  const addDoubt = useCallback((doubt) => {
    const newDoubt = {
      id: Date.now(),
      ...doubt,
      status: 'pending',
      response: '',
      createdAt: new Date().toISOString().split('T')[0],
      respondedAt: null
    };
    setDoubts(prev => [newDoubt, ...prev]);
    return newDoubt;
  }, []);

  const respondToDoubt = useCallback((id, response) => {
    setDoubts(prev => prev.map(doubt =>
      doubt.id === id
        ? {
            ...doubt,
            status: 'answered',
            response,
            respondedAt: new Date().toISOString().split('T')[0]
          }
        : doubt
    ));
  }, []);

  const getDoubtsByStudent = useCallback((studentId) => {
    return doubts.filter(doubt => doubt.studentId === studentId);
  }, [doubts]);

  const getPendingDoubts = useCallback(() => {
    return doubts.filter(doubt => doubt.status === 'pending');
  }, [doubts]);

  const getAllDoubts = useCallback(() => {
    return doubts;
  }, [doubts]);

  return (
    <DoubtsContext.Provider value={{
      doubts,
      addDoubt,
      respondToDoubt,
      getDoubtsByStudent,
      getPendingDoubts,
      getAllDoubts
    }}>
      {children}
    </DoubtsContext.Provider>
  );
};

export const useDoubts = () => {
  const context = useContext(DoubtsContext);
  if (!context) {
    throw new Error('useDoubts must be used within a DoubtsProvider');
  }
  return context;
};
