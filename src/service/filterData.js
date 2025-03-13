export const filterData = (data, searchText) => {
    if (!searchText) return data; 
  
    const lowerCaseSearchText = searchText.toLowerCase();
  
    return data.filter((item) => {
      return Object.values(item).some((value) => 
        String(value).toLowerCase().includes(lowerCaseSearchText)
      );
    });
  };
  