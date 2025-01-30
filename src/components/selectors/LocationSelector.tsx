import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Building2, Check, ChevronDown } from 'lucide-react';

const locations = [
  { id: 1, name: 'Orlando, FL - Honda', region: 'USA' },
  { id: 2, name: 'Winter Park, FL - Ford', region: 'USA' },
  { id: 3, name: 'Casselberry, FL - Hyundai', region: 'USA' },
];

interface LocationSelectorProps {
  isDarkMode: boolean;
}

export const LocationSelector = ({ isDarkMode }: LocationSelectorProps) => {
  const [selected, setSelected] = useState(locations[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          isDarkMode 
            ? 'hover:bg-gray-700 text-gray-200' 
            : 'hover:bg-gray-100 text-gray-700'
        } transition-colors`}>
          <Building2 className="w-5 h-5" />
          <span>{selected.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className={`absolute z-50 mt-1 w-56 rounded-lg py-1 shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            {locations.map((location) => (
              <Listbox.Option
                key={location.id}
                value={location}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? isDarkMode 
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-50 text-blue-900'
                      : isDarkMode
                        ? 'text-gray-200'
                        : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate font-medium">
                      {location.name}
                    </span>
                    <span className={`block truncate text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {location.region}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <Check className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};