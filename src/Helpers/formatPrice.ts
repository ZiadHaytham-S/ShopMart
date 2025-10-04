
export function formatCurrency(num:number) {
    return new Intl.NumberFormat("es-us" , {
        style :"currency",
        currency :"EGP"
    }).format(num)
}