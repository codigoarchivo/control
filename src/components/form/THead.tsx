interface ITHead {
  data: string[];
}

export const THead = (props: ITHead) => {
  return (
    <thead className='text-xs text-textSecondary uppercase bg-gray-50'>
      <tr>
        {props.data.filter(column => column.trim() !== '').map((column, index: number) => (
          <th key={index} scope='col' className='px-6 py-3 truncate'>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
