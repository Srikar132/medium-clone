import Form from "next/form";
import { FaSearch } from "react-icons/fa";
// import SearchFormRest from "@/components/SearchFormRest";



const SearchForm = ({query} : {query? : string}) => {

    return (
        <Form action={"/search"} scroll={false}
            className={`search-form`}
        >
            <input
                name="query"
                defaultValue={query}
                className={"search-input"}
                placeholder="What are you looking for ?"
            />
            <div className={`flex gap-2`}>
                {/* {query && <SearchFormRest/>} */}
                <button type={"submit"} className={"search-btn text-white"}>
                    <FaSearch className={"size-5"}/>
                </button>
            </div>
        </Form>
    );
};


export default SearchForm;