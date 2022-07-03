import { getRandomID } from '../../utils/randomID';
import EditButton from '../../assets/icons/actions/edit.svg';
import styles from './styles.module.scss';

interface PropsI {
  data: {
    id: string;
    [key: string]: any;
  }[];
  showCols?: string[];
  onClick?: (id: string) => void;
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

const EDIT_CONFIG: { width: string; 'text-align': 'start' | 'center' }[] = [
  {
    width: '50%',
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

const Table = ({ data: dataP, showCols, onClick }: PropsI) => {
  const STYLE_CONFIG = onClick ? EDIT_CONFIG : DEFAULT_CONFIG;

  const data = showCols
    ? dataP.map(item => {
        const res = {};
        Object.keys(item).forEach(key => {
          if (showCols.includes(key)) Object.assign(res, { [key]: item[key] });
        });
        return res;
      })
    : dataP;
  if (data.length === 0) return <></>;
  const headers = Object.keys(data[0]).filter(x => x !== 'id');

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h}>{h.toUpperCase()}</th>
          ))}
          {onClick && <th>EDITAR</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, i) => (
          <tr key={`${i}-${getRandomID()}`}>
            {headers
              .filter(x => x !== 'id')
              .map((col, i) => (
                <td
                  key={`${col}-row-${i}-${getRandomID()}`}
                  style={{
                    width: STYLE_CONFIG[i].width,
                    textAlign: STYLE_CONFIG[i]['text-align'],
                  }}
                >
                  {row[col]}
                </td>
              ))}
            {onClick && (
              <td>
                <button
                  onClick={() => {
                    onClick(row.id);
                  }}
                >
                  <EditButton />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
