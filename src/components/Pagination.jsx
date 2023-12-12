const Pagination = ({page, lastPage, setPage}) => {

  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0
    })
  }

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1)
    scrollTop()
  }

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1)
    scrollTop()
  }

  return (
    <div className="join">
      { page <= 1 ? null :
        <button onClick={handlePrevPage} className="join-item btn bg-primary text-white hover:text-primary hover:bg-white">«</button>
      }
      <button className="join-item btn bg-primary text-white hover:text-primary hover:bg-white">{page} of {lastPage}</button>
      { page >= lastPage ? null :
        <button onClick={handleNextPage} className="join-item btn bg-primary text-white hover:text-primary hover:bg-white">»</button>
      }
      </div>
  )
}

export default Pagination
