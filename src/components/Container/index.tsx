import classNames from 'classnames';
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
interface ContainerProps {
  children: ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <SafeAreaView className={classNames('flex-1 bg-white', className)}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default Container;
