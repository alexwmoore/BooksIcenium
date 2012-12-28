function accountPageLoad(token)
{
    if (token != 'undefined' || token.length > 0)
    {
        ShowFastReset();
    }
    else
    {
        HideFastReset();
    }
    
}
function ShowFastReset()
{
    $('#fastPINUpdate').show();
}
function HideFastReset()
{
    $('#fastPINUpdate').hide();
}