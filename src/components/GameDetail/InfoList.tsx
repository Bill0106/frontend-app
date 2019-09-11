import * as React from 'react';
import { Infos } from './style';

const InfoList: React.SFC<{ infos: string[] }> = ({ infos }) => {
  const slash = '|';
  const list = infos
    .reduce((res, item) => [...res, slash, item], [] as string[])
    .splice(1);

  const renderList = (item: string, index: number) =>
    item === slash ? (
      <i key={index}>{item}</i>
    ) : (
      <span key={index}>{item}</span>
    );

  return <Infos>{list.map(renderList)}</Infos>;
};

export default InfoList;
