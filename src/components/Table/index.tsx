import { getRandomID } from '../../utils/randomID';
import styles from './styles.module.scss';

interface PropsI {
  data: {
    [key: string]: any;
  }[];
}

const DEFAULT_CONFIG: { width: string; 'text-align': 'start' | 'center' }[] = [
  {
    width: '60%',
    'text-align': 'start',
  },
  {
    width: '20%',
    'text-align': 'center',
  },
  {
    width: '20%',
    'text-align': 'center',
  },
];

const Table = ({ data }: PropsI) => {
  if (data.length === 0) return <></>;
  const headers = Object.keys(data[0]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h}>{h.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr>
            {headers.map((col, i) => (
              <td
                key={`${col}-row-${i}-${getRandomID()}`}
                style={{
                  width: DEFAULT_CONFIG[i].width,
                  textAlign: DEFAULT_CONFIG[i]['text-align'],
                }}
              >
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
