import WhiteArrow from '../../../../assets/main/tabs/white_arrow.png';
import BlackArrow from '../../../../assets/main/tabs/black_arrow.png';

const Tab = ({title, active, onClick}) => {
    return <div className={'h-[70px] py-[10px] px-[30px] cursor-pointer ' + (active
        ? 'text-white bg-[#ed4e1d]'
        : 'border-b-[1px] border-solid border-slate-200')} onClick={onClick}>
        <span className={'font-bold text-xl leading-[50px] ' + (active ? '' : '')}>
            {title}
        </span>
        <span className={'float-right h-[50px] pt-[12px]'}>
            { active
                ? <img src={WhiteArrow} alt={'white-arrow'} className={'h-[26px]'}/>
                : <img src={BlackArrow} alt={'black-arrow'} className={'h-[26px]'}/>
            }
        </span>
    </div>
}

export default Tab;