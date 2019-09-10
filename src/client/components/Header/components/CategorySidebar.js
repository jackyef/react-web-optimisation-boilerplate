import React from 'react';
import { arrayOf, object, bool, func } from 'prop-types';

import Image from '../../Image';

import * as css from './styles';

const CategorySidebar = ({ categoryData, display, onClose }) => {
  const containerClasses = [css.categorySidebarContainer, display ? 'show' : ''].join(' ');
  const overlayClasses = [css.overlay, display ? css.overlayActive : ''].join(' ');

  console.log('do some heavy stuffs every render');
  for (let i = 0; i < 1000000; i ++ ) {
    Math.random() * 100;
  }
  
  return (
    <>
      <div className={containerClasses}>
        {categoryData.map((tab, index) => {
          return (
            <div key={index}>
              <div
                className={css.tabTitle}
              >
                {tab.tabTitle}
              </div>
              {tab.list.map((subItem, i2) => {
                const SubItemElement = tab.template === 'multi' ? 'span' : 'div';

                return (
                  <div key={i2}>
                    <div className={css.subItemHeading}>
                      {subItem.imageUrl ? <Image src={subItem.imageUrl} /> : null}
                      <SubItemElement>{subItem.text}</SubItemElement>
                    </div>
                    {subItem.list.map((subItem2, i3) => {
                      return (
                        <div key={i3}>
                          <div className={css.subItem2Heading}>{subItem2.text}</div>
                          {subItem2.list.map((lowestItem, i4) => {
                            return (
                              <div key={i4} className={css.lowestItem}>
                                {lowestItem.text}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={overlayClasses} onClick={onClose} />
    </>
  );
};

CategorySidebar.propTypes = {
  categoryData: arrayOf(object),
  display: bool,
  onClose: func.isRequired,
};

CategorySidebar.defaultProps = {
  categoryData: [],
  display: true,
};

export default React.memo(CategorySidebar);
