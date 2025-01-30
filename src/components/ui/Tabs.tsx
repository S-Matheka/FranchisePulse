import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  return (
    <div className="space-y-4">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="flex space-x-1 border-b">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors relative
        ${value === 'calls' 
          ? 'text-[#4f8edb] border-b-2 border-[#4f8edb]' 
          : 'text-[#58677f] hover:text-[#1f3653]'
        }
      `}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: TabsContentProps) => {
  return (
    <div className={value === 'calls' ? 'block' : 'hidden'}>
      {children}
    </div>
  );
};