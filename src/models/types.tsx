import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the parameter types for your navigation
export type RootStackParamList = {
  List: undefined; // No parameters for the List screen
  EmployeeDetails: { employeeId: string }; // Pass employeeId as a parameter to EmployeeDetails screen
};

export type EmployeeDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EmployeeDetails'
>;

export type ListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'List'>;
