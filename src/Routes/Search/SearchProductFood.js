import React, { useEffect, useState } from 'react';
import './SearchStyle.scss';
import ad1 from '../../image/ad1.jpg';
import ad2 from '../../image/ad2.jpg';
import ad3 from '../../image/ad3.jpg';
import ad4 from '../../image/ad4.jpg';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse, Button, CardBody, Card,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import SearchResult from './SearchResult';
import {
  foodApi,
  sortApi,
  getAdvertisementFoodApi,
  manufacturerApi,
} from '../../api';
import { FaBuilding, FaCrown, FaAllergies } from 'react-icons/fa';
import { IoIosPaper } from 'react-icons/io';
import{RiSearch2Line}from 'react-icons/ri';
import AdFoodResult from './AdFoodResult';

const items = [
   {
      src: ad1,
    },
    {
      src: ad2,
    },
    {
      src:ad4
    }
];
const SearchTab = (props) => {
  //광고부분
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  const NUM_OF_SHOW_ROWS = 5; // 최대 저장 검색어

  //드롭다운 부분
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);
  //알러지 토글 부분
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //옵션 선택
  const [option, setOption] = useState('식품명');
  //초기 설정 부분
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //검색어부분
  const [searchTerm, setSearchTerm] = useState(null);
  //검색결과 데이터
  const [result, setResult] = useState(null);
  //이전 검색 결과
  const [data, setData] = useState(null);
  //정렬방식 선택
  const [sort, setSort] = useState('ranking');
  //알레르기 배열
  let allergyList = [];
  const [allergies, setAllergies] = useState([]);
  // 광고 식품 데이터
  const [adFoods, setAdFoods] = useState(null);
  // 검색 기록을 위한 state
  const [foodKeywords, setFoodKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForName') || '[]'),
  );
  const [bsshKeywords, setBsshKeywords] = useState(
    JSON.parse(localStorage.getItem('keywordsFoodForBssh') || '[]'),
  );

  //마운팅 될 때
  useEffect(() => {
    if(sessionStorage.getItem('allergies')){
      allergyList=sessionStorage.getItem('allergies');
      console.log('알러지 설정: ',allergyList);
    }
    if (sessionStorage.getItem('searchTerm') && sessionStorage.getItem('data')) {
      //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
      localStorage.setItem('keywordsFoodForName', JSON.stringify(foodKeywords));
      localStorage.setItem('keywordsFoodForBssh', JSON.stringify(bsshKeywords));

      setSearchTerm(sessionStorage.getItem('searchTerm'));
      console.log('이전 검색어: ', searchTerm);
      setResult(JSON.parse(sessionStorage.getItem('data')));
      setAdFoods(JSON.parse(sessionStorage.getItem('adFood')));

      console.log('이전 검색 결과', result);
    }
  }, [data, foodKeywords, bsshKeywords]);


  //검색버튼 누를때
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('체크된 알러지',allergyList);
    if (searchTerm !== null && searchTerm.length !== 0) {
      sessionStorage.setItem('searchTerm', searchTerm);
      try {
     
          if (option === '식품명') {
            const { data: { data } } = await foodApi.search(searchTerm, sort, allergyList);
            sessionStorage.setItem('data', JSON.stringify(data));
            setResult(data);
            console.log("검색결과",data);
          } else {
            const { data: { data } } = await manufacturerApi.search( searchTerm,sort, allergyList);
            sessionStorage.setItem('data', JSON.stringify(data));
            setResult(data);
            console.log("검색결과",data);
          }
       
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      handleAddKeyword();
      getAd();
    } else {
      setError('검색결과가 없습니다!');
    }
  };
  //카테고리 누를때
const handleCategory = async (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm !== null && searchTerm.length !== 0) {
      sessionStorage.setItem('searchTerm', searchTerm);
      try {
     
          if (option === '식품명') {
            const { data: { data } } = await foodApi.search(searchTerm, sort, allergyList);
            sessionStorage.setItem('data', JSON.stringify(data));
            setResult(data);
            console.log("검색결과",data);
          } else {
            const { data: { data } } = await manufacturerApi.search( searchTerm,sort, allergyList);
            sessionStorage.setItem('data', JSON.stringify(data));
            setResult(data);
            console.log("검색결과",data);
          }
       
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
      handleAddKeyword();
      getAd();
    } else {
      setError('검색결과가 없습니다!');
    }
  };
  // 광고 불러오기
  const getAd = async () => {
    console.log('getAD 실행');
    // setLoading(true);
    await getAdvertisementFoodApi.getAdFood().then(res => {
      setAdFoods(res.data);
      sessionStorage.setItem('adFood', JSON.stringify(res.data));
      // setLoading(false);
    }).catch(e => {
      setError(e);
    });
  };

  // 검색어 입력시 keywords에 추가
  const handleAddKeyword = () => {
    if (option === '식품명') {
      for (let i = 0; i < Math.min(foodKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (foodKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (foodKeywords.length > 100) {
        // 최대 100건만 저장
        foodKeywords.length = 100;
      }
      setFoodKeywords([newKeyword, ...foodKeywords]);
    } else {
      for (let i = 0; i < Math.min(bsshKeywords.length, NUM_OF_SHOW_ROWS); i++) {
        // 중복 저장 방지 (보여지는 부분 만큼만 처리)
        if (bsshKeywords[i].text === searchTerm) {
          return;
        }
      }
      const newKeyword = {
        id: Date.now(),
        text: searchTerm,
      };
      if (bsshKeywords.length > 100) {
        // 최대 100건만 저장
        bsshKeywords.length = 100;
      }
      setBsshKeywords([newKeyword, ...bsshKeywords]);
    }

  };

  //정렬방법
  const handleSort = async (sortType) => {
    console.log('정렬방법: ', sortType);
    console.log('검색어:', searchTerm);
    try {
      setLoading(true);
      const { data: { data } } = await sortApi.sortBy(searchTerm, sortType,allergyList);
      console.log(data);
      setResult(data);
      sessionStorage.setItem('data', JSON.stringify(data));
    } catch (sortType) {
      setError(sortType);
    } finally {
      setLoading(false);
    }
  };
  //알러지 추가
  const handleAllergy = (allergy) => {
     console.log('알러지리스트',allergyList);
    var idx=-1;
    for(var i=0;i<allergyList.length;i++){
      if(allergy===allergyList[i]){
        idx=i;
      }
    }
    if(idx===-1){
      allergyList.push(allergy);
    }else{
      allergyList.splice(idx,1);
    }
    sessionStorage.setItem('allergies',allergyList);
    console.log('알러지리스트',allergyList);
  };

  return (
    <div className="container">
      <header className="item__header">
         {searchTerm === null ? <Input
              placeholder='검색어를 입력하세요'
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type='search'
              className='input'
            /> :
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type='search'
              list='searchHistory'
              className='input'
            />
          }
          <datalist id='searchHistory'>
            {option === '식품명' ? (
              <>
                {foodKeywords.slice(0, NUM_OF_SHOW_ROWS).map((item, index) => {
                  return <option key={index} value={item.text} />;
                })}
              </>
            ) : (
              <>
                {bsshKeywords.slice(0, NUM_OF_SHOW_ROWS).map((item, index) => {
                  return <option key={index} value={item.text} />;
                })}
              </>
            )}

          </datalist>
             <InputGroupAddon addonType='append'>
            <button onClick={handleSubmit} className="searchBtn">
              <RiSearch2Line size="40"></RiSearch2Line>
            </button>
          </InputGroupAddon>
      </header>
      <div className="item__main">
         <div className="item__category list-group categoryGroup">
         
          <li class='list-group-item category'>간식</li>
          <button
            type='button'
            value='과자'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            과자
          </button>
          <button
            type='button'
            value='떡'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            떡
          </button>
          <button
            type='button'
            value='빵'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            빵
          </button>
          <button
            type='button'
            value='사탕/껌/젤리'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            사탕/껌/젤리
          </button>
          <button
            type='button'
            value='아이스크림'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            아이스크림
          </button>
          <button
            type='button'
            value='초콜릿'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            초콜릿
          </button>

          <li class='list-group-item category'>음료/차</li>
          <button
            type='button'
            value='음료'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            음료
          </button>
          <button
            type='button'
            value='커피'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            커피
          </button>

          <button
            type='button'
            value='커피/차'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            커피/차
          </button>
          <li class='list-group-item category'>유제품</li>
          <button
            type='button'
            value='유제품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            유제품
          </button>
          <li class='list-group-item category'>농수산물</li>
          <button
            type='button'
            value='계란'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            계란
          </button>
          <button
            type='button'
            value='과일/채소'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            과일/채소
          </button>
          <button
            type='button'
            value='김'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            김
          </button>
          <button
            type='button'
            value='수산물'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            수산물
          </button>
          <button
            type='button'
            value='견과'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            견과
          </button>
          <button
            type='button'
            value='곡류'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            곡류
          </button>
          <li class='list-group-item category'>김치</li>
          <button
            type='button'
            value='김치'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            김치
          </button>
          <button
            type='button'
            value='젓갈'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            젓갈
          </button>

          <li class='list-group-item category'>조미료</li>
          <button
            type='button'
            value='설탕'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            설탕
          </button>
          <button
            type='button'
            value='소금'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            소금
          </button>
          <button
            type='button'
            value='소스'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            소스
          </button>
          <button
            type='button'
            value='장류'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            장류
          </button>
          <li class='list-group-item category'>즉석조리식품</li>
          <button
            type='button'
            value='즉석조리식품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            즉석조리식품
          </button>
          <button
            type='button'
            value='국수'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            국수
          </button>
          <button
            type='button'
            value='두부'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            두부
          </button>
          <button
            type='button'
            value='식용유'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            식용유
          </button>
          <button
            type='button'
            value='어묵'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            어묵
          </button>
          <li class='list-group-item category'>기타</li>
          <button
            type='button'
            value='기타가공품'
            className='list-group-item list-group-item-action'
            onClick={handleCategory}
          >
            기타가공품
          </button>
         </div>
        <div className="item__items">
          <div className="item__result">
            {/* 광고부분 */}
           <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      
       <div className='selectType list-group resultPage sortBy'>
         <p className="result">검색결과</p>
         <div className="form-check__group">
            <div class='form-check'>
              <input type='button' onClick={() => handleSort('ranking')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <FaCrown></FaCrown>랭킹순
              </label>
            </div>
            <div class='form-check'>
              <input type='button' onClick={() => handleSort('reviewCount')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <IoIosPaper></IoIosPaper>리뷰순
              </label>
            </div>

            <div class='form-check'>
              <input type='button' onClick={() => handleSort('manufacturer')} class='form-check-input' type='radio'
                     name='flexRadioDefault' id='flexRadioDefault2' />
              <label class='form-check-label' for='flexRadioDefault2'>
                <FaBuilding></FaBuilding>제조사별
              </label>
            </div>
          </div>
          </div>
          {/* 결과부분 */}
        <SearchResult className='searchResult' loading={loading} result={result}/>
      </div>

    </div>
       
       
      </div>
      
      <div className="item__paging">페이징</div>
    </div>
  );
};
export default SearchTab;