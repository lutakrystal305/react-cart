import React, { useContext } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ProductContext } from '../context/Product.Context';

const Example = (props) => {
    let {
        currentPage,
        nextPage,
        next2Page,
        prePage,
        pre2Page,
        topUrl,
        endPage,
        handleChangePage
    } = useContext(ProductContext);
  return (
    <Pagination aria-label="Page navigation example" className="Paginationz">
        {(currentPage > 2) ?
            (<PaginationItem>
                <PaginationLink href={`/product?page=${pre2Page.number}`} >
                    <span >
                        {pre2Page.number}
                    </span>
                </PaginationLink>
            </PaginationItem>)
        : ''
        }
        {(currentPage > 1) ?
            (<PaginationItem>
                <PaginationLink href={`/product?page=${prePage.number}`} >
                    <span >
                        {prePage.number}
                    </span>
                </PaginationLink>
            </PaginationItem>)
        : ''
        }
        <PaginationItem>
            <PaginationLink href={`/product?page=${currentPage}`}>
                {currentPage}
            </PaginationLink>
        </PaginationItem>
        { (currentPage = endPage.number ) ?
            (<PaginationItem>
                <PaginationLink href={`/product?page=${nextPage.number}`} >
                    <span >
                        {nextPage.number}
                    </span>
                </PaginationLink>
            </PaginationItem>)
            : ''
        }
        {(currentPage > (endPage.number - 2)) ?
            (<PaginationItem>
                <PaginationLink href={`/product?page=${next2Page.number}`} >
                    <span >
                        {next2Page.number}
                    </span>
                </PaginationLink>
            </PaginationItem>)
            : ''
            }
    </Pagination>
  );
}

export default Example;