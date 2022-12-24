import { FC } from 'react';
import { Spreadsheet } from './components/Spreadsheet/Spreadsheet';
import { AppWrapper } from './styles/App.styles';

const App: FC = () => {
  return (
    <AppWrapper>
      <Spreadsheet />
    </AppWrapper>
  );
};

export default App;
