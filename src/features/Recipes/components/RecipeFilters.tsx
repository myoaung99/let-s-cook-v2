import React from 'react';
import {useRouter} from "next/router";
import {Button} from "@/components/ui/button"
import * as z from "zod"
import {Form,} from "@/components/ui/form"
import {Label} from "@/components/ui/label";
import {useInitialFilterValues} from "@/features/Recipes/hook/useInitialFilterValues";
import {formSchema} from "@/features/Recipes/utils";
import {IngredientSelector} from "@/features/Recipes/components/IngredientSelector";
import {CountrySelector} from "@/features/Recipes/components/CountrySelector";
import {FilterBySelect} from "@/features/Recipes/components/FilterBySelect";

const RecipeFilters = () => {
    const router = useRouter();
    const [form] = useInitialFilterValues()
    const {watch} = form;
    const watchFilterBy = watch('filterBy')

    const handleOnSearch = (values: z.infer<typeof formSchema>) => {
        if (values.filterBy === 'Country') {
            router.push(`/recipes?filter=${values.filterBy}&value=${values.countrySelector}`)
        }

        if (values.filterBy === 'Ingredient') {
            router.push(`/recipes?filter=${values.filterBy}&value=${values.ingredientSelector}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSearch)}>
                <section className='md:flex md:justify-between md:items-end py-4 mb-5'>
                    <div className={'flex flex-col md:flex-row gap-2 md:items-center md:gap-4'}>
                        <Label htmlFor={'filterBy'}>Filter by</Label>
                        <div key={watchFilterBy} className='flex items-center gap-3 mb-3 md:mb-0'>
                            <FilterBySelect form={form}/>
                        </div>
                    </div>

                    <div className='space-y-3 md:space-y-0 md:flex md:items-center md:space-x-2'>
                        {watchFilterBy === 'Ingredient' ?
                            <IngredientSelector form={form}/>
                            : null}

                        {watchFilterBy === 'Country' ?
                            <CountrySelector form={form}/> : null}

                        <div className='flex justify-end'>
                            <Button type='submit'>Search</Button>
                        </div>
                    </div>
                </section>
            </form>
        </Form>

    );
}

export default RecipeFilters;

// const RecipeCategoryComboBox: React.FC<RecipeCategoryComboBoxProps> = ({getSearchCategory}) => {
//     const router = useRouter();
//     const categoryQuery = router.query?.value as string | undefined
//
//
//     const {data, isLoading} = useGetCategoriesQuery({skip: router.isFallback})
//     const categories = data?.categories as Array<Category>;
//     const [open, setOpen] = React.useState(false)
//     const [value, setValue] = React.useState('')
//
//     useEffect(() => {
//         if (!!categoryQuery) {
//             setValue(categoryQuery.toLowerCase())
//         }
//     }, [categoryQuery])
//
//     const getSelectedCategoryLabel = () =>
//         categories?.find((category) => category.strCategory.toLowerCase() === value)?.strCategory
//
//     const handleOnSelect = (currentValue: string) => {
//         const selectedValue = currentValue === value ? "" : currentValue;
//         setValue(selectedValue)
//         getSearchCategory(selectedValue)
//         setOpen(false)
//     }
//
//     return <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//             <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className={`w-full justify-between font-normal ${!!value ? 'text-black' : 'text-gray-400'}`}
//             >
//                 {value
//                     ? getSelectedCategoryLabel()
//                     : "Select category..."}
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
//             </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-full p-0">
//             <Command>
//                 <CommandInput placeholder="Search category..."/>
//                 <CommandEmpty>No framework found.</CommandEmpty>
//                 {isLoading
//                     ? <CommandEmpty>loading..</CommandEmpty> : <CommandGroup>
//                         {categories?.map((category) => (
//                             <CommandItem
//                                 key={category?.idCategory}
//                                 onSelect={handleOnSelect}
//                             >
//                                 <Check
//                                     className={cn(
//                                         "mr-2 h-4 w-4",
//                                         value === category.strCategory.toLowerCase() ? "opacity-100" : "opacity-0"
//                                     )}
//                                 />
//                                 {category.strCategory}
//                             </CommandItem>
//                         ))}
//                     </CommandGroup>
//                 }
//
//             </Command>
//         </PopoverContent>
//     </Popover>
// }
