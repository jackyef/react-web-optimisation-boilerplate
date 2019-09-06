import React, { useState, useCallback } from 'react';
import CategorySidebar from './components/CategorySidebar';

import tokopediaImg from './assets/tokopedia.png';
import categoryData from './mocks/categoryData';
import './styles.css';

const Header = () => {
  const [state, setState] = useState('');
  const [categorySidebarDisplay, setSidebarDisplay] = useState(false);
  
  const showSidebar = useCallback(() => {
    setSidebarDisplay(true);
  }, [])
  
  const hideSidebar = useCallback(() => {
    setSidebarDisplay(false);
  }, [])

  const handleSearchChange = (e) => setState(e.target.value);

  // we will memoize this value with useMemo when we want to optimise this
  const finalCategoryData = (() => {
    const categoryTabData = categoryData?.dynamicHomeIcon?.categoryGroup || [];
    const categoryListData = categoryData?.categoryAllListLite?.categories || [];
    let result = [];
  
    if (categoryTabData.length) {
      result = categoryTabData.map((res) => ({
        tabTitle: res.title,
        template: res.title === 'Belanja' ? 'multi' : 'single',
        list:
          res.title === 'Belanja'
            ? categoryListData.map(listData => ({
                text: listData.name,
                url: listData.url,
                imageUrl: listData.iconImageUrl, // missing from api
                list: listData.children.map((lvl1) => {
                  return {
                    text: lvl1.name,
                    url: lvl1.url,
                    list: lvl1.children.map((lvl2) => {
                      return {
                        text: lvl2.name,
                        url: lvl2.url,
                      };
                    }),
                  };
                }),
              }))
            : res.categoryRows.map(resList => ({
                text: resList.name,
                url: resList.url,
                imageUrl: resList.imageUrl,
                list: [],
              })),
      }));
    }

    return result;
  })();

  return (
    <>
      <div className="headerContainer">
        <img className="headerContainer-Logo" src={tokopediaImg} />
        <div className="headerContainer-CategoryItem" onClick={showSidebar}>Kategori</div>
        <div className="headerContainer-SearchInputContainer">
          <input type="text" value={state} placeholder="Cari barang di Tokopedia..." onChange={handleSearchChange} />
        </div>
      </div>
      <CategorySidebar categoryData={finalCategoryData} display={categorySidebarDisplay} onClose={hideSidebar}/>
    </>
  )
}

export default Header;