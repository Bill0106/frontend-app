import * as React from 'react';
import { Infos } from './style';

const InfoList: React.SFC<{ infos: Array<string> }> = ({ infos }) => {
  const slash = '|';
  const list = infos
    .reduce((res, item) => [...res, slash, item], [] as Array<string>)
    .splice(1);

  const renderList = (item: string) =>
    item === slash ? <i>{item}</i> : <span>{item}</span>;

  return <Infos>{list.map(renderList)}</Infos>;
};

export default InfoList;
