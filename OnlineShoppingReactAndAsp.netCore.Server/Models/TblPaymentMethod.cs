﻿using System;
using System.Collections.Generic;

namespace OnlineShoppingReactAndAsp.netCore.Server.Models;

public partial class TblPaymentMethod
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<TblOrder> TblOrders { get; set; } = new List<TblOrder>();

    public virtual ICollection<TblTransaction> TblTransactions { get; set; } = new List<TblTransaction>();
}
